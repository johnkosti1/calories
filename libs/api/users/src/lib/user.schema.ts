import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IUserServer } from '@calories/utils/types';

export type UserDocument = UserDto & Document;

@Schema()
export class UserDto implements IUserServer {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  isAdmin: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  caloriePerDay: number;

  @Prop({ required: true })
  budgetPerMonth: number;
}


export const UserDtoSchema = SchemaFactory.createForClass(UserDto);
