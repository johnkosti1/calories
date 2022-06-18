import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { IUserServer } from '@calories/utils/types';

export class CreateUserDto implements IUserServer {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;

  @IsOptional()
  @IsNumber()
  caloriePerDay: number;

  @IsOptional()
  @IsNumber()
  budgetPerMonth: number;
}
