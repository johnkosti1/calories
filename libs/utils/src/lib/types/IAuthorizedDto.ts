import { IUser } from './IUser';

export interface IAuthorizedDto {
  user: IUser
  access_token: string
}
