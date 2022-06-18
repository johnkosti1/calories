import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodDocument, FoodDto } from './food.schema';
import {
  DateFormats,
  IFood,
  IFoodFilter,
  IGroupedFood,
  IGroupedFoodWithItems,
  IGroupedWithUser,
  IStats,
  IUser,
  IUserServer
} from '@calories/utils/types';
import { CreateFoodDto } from './CreateFoodDto';
import { UsersService } from '@calories/api/users';
import moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { calculateFoodTotals, calculateWeekDays, reduceFoodBy } from '@calories/utils';

@Injectable()
export class FoodService {

  private dateFormats: DateFormats = this.configService.get('environment').dateFormats;

  constructor(@InjectModel(FoodDto.name) private foodModel: Model<FoodDocument>,
              private configService: ConfigService,
              private userService: UsersService) {
  }

  private dateStringToMoment(date: string, format = this.dateFormats.dateTimeFormat) {
    return moment(date, format || this.dateFormats.dateTimeFormat);
  }

  private removeHours(date: moment.Moment) {
    return date.format(this.dateFormats.dateFormat);
  }

  private monthYearFormat(date: moment.Moment) {
    return date.format(this.dateFormats.monthYear);
  }

  private isDayInRange(date: string, dateFrom: moment.Moment, dateTo: moment.Moment, monthCheck = false) {
    if (dateFrom && dateTo) {
      const momentDate = this.dateStringToMoment(date);
      const isSameOrAfter = monthCheck ? momentDate.isSameOrAfter(dateFrom, 'month') : momentDate.isSameOrAfter(dateFrom);
      const isSameOrBefore = monthCheck ? momentDate.isSameOrBefore(dateTo, 'month') : momentDate.isSameOrBefore(dateTo);

      return isSameOrAfter && isSameOrBefore;
    } else {
      return true;
    }
  }

  async findFood(user: IUserServer | undefined = undefined): Promise<IFood[]> {
    const food = await this.foodModel.find(user ? {
      userDto: user
    } : {})
      .populate('userDto', 'username firstName lastName isAdmin caloriePerDay budgetPerMonth')
      .populate('creatorUser', 'username firstName lastName isAdmin caloriePerDay budgetPerMonth')
      .exec();

    return food.sort((a, b) =>
      this.dateStringToMoment(a.date).isAfter(this.dateStringToMoment(b.date)) ? -1 : 1
    );
  }

  async stats(week = 0): Promise<IStats> {
    const food = await this.findFood();

    const [currentWeekStart, currentWeekEnd] = calculateWeekDays(week, this.dateFormats.dateFormat);
    const [previousWeekStart, previousWeekEnd] = calculateWeekDays(week + 1, this.dateFormats.dateFormat);

    const currentWeekFood = food.filter(item => this.isDayInRange(item.date, currentWeekStart, currentWeekEnd));
    const previousWeekFood = food.filter(item => this.isDayInRange(item.date, previousWeekStart, previousWeekEnd));

    return {
      currentWeek: calculateFoodTotals(currentWeekFood || []),
      previousWeek: calculateFoodTotals(previousWeekFood || []),
      userTotals: this.calculateUserTotals(currentWeekFood),
      currentWeekDates: [this.removeHours(currentWeekStart), this.removeHours(currentWeekEnd)],
      previousWeekDates: [this.removeHours(previousWeekStart), this.removeHours(previousWeekEnd)]
    };
  }

  async group(user: IUserServer, filter: IFoodFilter): Promise<{
    result: IGroupedFoodWithItems[],
    monthlyData: IGroupedFood[],
    user: IUser
  }> {
    const dateFrom = filter.dateFrom && this.dateStringToMoment(filter.dateFrom);
    const dateTo = filter.dateTo && this.dateStringToMoment(filter.dateTo)
      .add(23, 'hour')
      .add(59, 'minute')
      .add(59, 'second')

    const resultUser = user.isAdmin
      ? filter.userId
        ? await this.userService.getSingle(filter.userId) as IUserServer
        : undefined
      : user;

    const food = await this.findFood(resultUser);

    // data includes all month items in range.
    // For example:
    // if one item's date is 05/12/2021, second's is 15/12/2021 and startDate is 10/12/2021
    // data will include first value for monthly statistics
    // this will be filtered out on result calculation
    const data = !(filter.dateFrom && filter.dateFrom) ? food :
      food.filter(item =>
        this.isDayInRange(
          item.date,
          dateFrom,
          dateTo,
          true
        ));

    return {
      result: this.calculateGroupResult(data, dateFrom, dateTo),
      monthlyData: data.length ? this.calculateMonthlyTotals(data) : [],
      user: resultUser
    };
  }

  private calculateUserTotals(food: IFood[]): IGroupedWithUser[]  {
    const records = reduceFoodBy(food || [], (item) => item.userDto._id);
    return Object.keys(records).reduce((acc, curr) => [
      ...acc,
      {
        ...calculateFoodTotals(records[curr] || []),
        user: records[curr]?.[0]?.userDto
      }
    ], []);
  }

  private calculateMonthlyTotals(food: IFood[]): IGroupedFood[] {
    const keyGenerator = (item) => this.monthYearFormat(this.dateStringToMoment(item.date));
    const records = reduceFoodBy(food, keyGenerator);

    return Object.keys(records).reduce((acc, curr) => {
      return ([
        ...acc,
        {
          ...calculateFoodTotals(records[curr] || []),
          date: curr
        }
      ]);
    }, []);
  }

  private calculateGroupResult(food: IFood[], dateFrom: moment.Moment, dateTo: moment.Moment): IGroupedFoodWithItems[] {
    const filteredData = food.filter(item => this.isDayInRange(item.date, dateFrom, dateTo));

    const keyGenerator = (item) => this.removeHours(this.dateStringToMoment(item.date));
    const records = reduceFoodBy(filteredData, keyGenerator);

    return Object.keys(records).reduce((acc, curr) => {
      return ([
        ...acc,
        {
          ...calculateFoodTotals(records[curr]),
          date: curr,
          items: records[curr]
        } as IGroupedFoodWithItems
      ]);
    }, [] as IGroupedFoodWithItems[]);
  }

  async findOne(id: string): Promise<IFood> {
    return this.foodModel.findById(id)
      .populate('userDto', 'username firstName lastName isAdmin caloriePerDay budgetPerMonth')
      .populate('creatorUser', 'username firstName lastName isAdmin caloriePerDay budgetPerMonth')
      .exec();
  }

  create(createFoodDto: CreateFoodDto, user: IUser) {
    const createdFood = new this.foodModel({
      ...createFoodDto,
      userDto: user.isAdmin
        ? createFoodDto?.userId || user._id
        : user._id,
      creatorUser: user._id
    });

    return createdFood.save();
  }

  update(id: string, food: CreateFoodDto) {
    return this.foodModel.findByIdAndUpdate(id, food);
  }

  delete(id: string) {
    return this.foodModel.findByIdAndDelete(id);
  }
}
