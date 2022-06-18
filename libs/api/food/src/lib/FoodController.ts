import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { FoodService } from './FoodService';
import { IsAdminGuard, JwtAuthGuard } from '@calories/api/auth';
import { Namespaces, serverUrls } from '@calories/utils';
import { IFoodFilter } from '@calories/utils/types';

import { CreateFoodDto } from './CreateFoodDto';

@UseGuards(JwtAuthGuard)
@Controller(Namespaces.Food)
export class FoodController {

  constructor(private foodService: FoodService) {
  }

  @UseGuards(IsAdminGuard)
  @Get(serverUrls[Namespaces.Food].stats)
  get(@Param('week', ParseIntPipe) week = 0) {
    return this.foodService.stats(week);
  }

  @Get(serverUrls[Namespaces.Food].group)
  group(@Request() req, @Query() params: IFoodFilter) {
    return this.foodService.group(req.user, params);
  }

  @Get(serverUrls[Namespaces.Food].single)
  getSingle(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Post(serverUrls[Namespaces.Food].create)
  create(@Request() req, @Body() body: CreateFoodDto) {
    return this.foodService.create(body, req.user);
  }

  @Put(serverUrls[Namespaces.Food].update)
  update(@Param('id') id: string, @Body() food: CreateFoodDto) {
    return this.foodService.update(id, food);
  }

  @Delete(serverUrls[Namespaces.Food].delete)
  delete(@Param('id') id: string) {
    return this.foodService.delete(id);
  }
}
