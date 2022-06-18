import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiUsersModule } from '@calories/api/users';
import { ConfigModule } from '@nestjs/config';

import { FoodDto, FoodDtoSchema } from './food.schema';
import { FoodService } from './FoodService';
import { FoodController } from './FoodController';

@Module({
  imports: [
    ApiUsersModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: FoodDto.name, schema: FoodDtoSchema }])
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [],
})
export class ApiFoodModule {}
