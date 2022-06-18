import { IGroupedFood, IGroupedFoodWithItems } from './IGroupedFood';
import { IUser } from './IUser';

export interface IGroupResponse {
  result: IGroupedFoodWithItems[],
  monthlyData: IGroupedFood[],
  user: IUser | undefined
}
