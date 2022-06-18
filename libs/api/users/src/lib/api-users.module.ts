import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserDto, UserDtoSchema } from './user.schema';
import { UsersService } from './UsersService';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: UserDto.name, schema: UserDtoSchema }])
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService]
})
export class ApiUsersModule {
}
