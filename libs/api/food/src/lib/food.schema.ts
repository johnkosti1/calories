import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { IFood } from '@calories/utils/types';
import { UserDto } from '@calories/api/users';

export type FoodDocument = FoodDto & Document;

@Schema()
export class FoodDto implements IFood {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  calorie: number;

  @Prop({ required: false })
  userId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'UserDto' })
  creatorUser: UserDto;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'UserDto' })
  userDto: UserDto;
}

export const FoodDtoSchema = SchemaFactory.createForClass(FoodDto);
