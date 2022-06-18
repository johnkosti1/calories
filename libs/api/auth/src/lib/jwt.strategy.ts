import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IUser } from '@calories/utils/types';

import { jwtConstants } from './constants';
import { AuthService } from './authService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IUser) {
    const user = await this.authService.validateUserByJwt(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
