import { IFood } from './IFood';
import { IUser } from './IUser';

export interface IFoodAverages {
  totalCalories: number;
  totalPrice: number;
  averageCalories: number;
  averagePrice: number;
  count?: number;
}

export interface IGroupedFood extends IFoodAverages {
  date: string;
  calorieLimit?: number;
}


export interface IGroupedFoodWithItems extends IGroupedFood {
  items: IFood[];
}

export interface IGroupedWithUser extends IGroupedFood {
  user: IUser;
}
