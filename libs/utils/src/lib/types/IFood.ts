import { IUser } from './IUser';

export interface IFood {
  _id?: string
  name: string
  date: string
  price: number
  calorie: number

  userId?: string;
  userDto?: IUser
  creatorUser?: IUser
}
