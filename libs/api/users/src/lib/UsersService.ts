import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { IUser, IUserServer, ProjectVariables } from '@calories/utils/types';

import { UserDocument, UserDto } from './user.schema';
import { CreateUserDto } from './CreateUserDto';

@Injectable()
export class UsersService {

  private projectVariables: ProjectVariables = this.configService.get('environment').projectVariables;

  constructor(@InjectModel(UserDto.name) private userModel: Model<UserDocument>,
              private configService: ConfigService) {
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find(null, 'username firstName lastName isAdmin caloriePerDay budgetPerMonth').exec();
  }

  async getSingle(id: string): Promise<IUser> {
    return this.userModel.findById(id, 'username firstName lastName isAdmin caloriePerDay budgetPerMonth').exec();
  }

  async findOne(username: string): Promise<IUserServer> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,

      caloriePerDay: createUserDto.caloriePerDay || this.projectVariables.maxCalories,
      budgetPerMonth: createUserDto.budgetPerMonth || this.projectVariables.maxBudget
    });
    return createdUser.save();
  }

  async update(id: string, createUserDto: Partial<CreateUserDto>): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, {
      ...createUserDto,
      caloriePerDay: createUserDto.caloriePerDay || this.projectVariables.maxCalories,
      budgetPerMonth: createUserDto.budgetPerMonth || this.projectVariables.maxBudget
    });
  }
}
