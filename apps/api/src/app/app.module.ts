import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

import { ApiAuthModule, IsAdminGuard } from '@calories/api/auth';
import { ApiUsersModule } from '@calories/api/users';
import { ApiFoodModule } from '@calories/api/food';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

@Module({
  imports: [
    ApiAuthModule,
    ApiUsersModule,
    ApiFoodModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/toptal')
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    },
  ]
})
export class AppModule {
}
