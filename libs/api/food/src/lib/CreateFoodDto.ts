import { IFood } from '@calories/utils/types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto implements IFood {
  @IsString()
  name: string;

  @IsString()
  date: string;

  @IsNumber()
  price: number;

  @IsNumber()
  calorie: number;

  @IsString()
  @IsOptional()
  userId: string;
}
