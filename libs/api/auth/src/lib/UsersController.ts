import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';

import { CreateUserDto, UsersService } from '@calories/api/users';
import { Namespaces, serverUrls } from '@calories/utils';

import { IsAdminGuard } from './IsAdmin.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(IsAdminGuard)
@UseGuards(JwtAuthGuard)
@Controller(Namespaces.Users)
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post(serverUrls[Namespaces.Users].create)
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(serverUrls[Namespaces.Users].get)
  public getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(serverUrls[Namespaces.Users].single)
  public single(@Param('id') id: string) {
    return this.usersService.getSingle(id);
  }

  @Put(serverUrls[Namespaces.Users].update)
  public update(@Param('id') id: string, @Body() user: Partial<CreateUserDto>) {
    return this.usersService.update(id, user);
  }
}
