import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './authService';
import { LoginDto } from './LoginDto';

import { Namespaces, serverUrls } from '@calories/utils';
import { IAuthorizedDto } from '@calories/utils/types';

@Controller(Namespaces.Auth)
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post(serverUrls[Namespaces.Auth].login)
  async login(@Body() loginDto: LoginDto): Promise<IAuthorizedDto> {
    return this.authService.login(loginDto);
  }
}
