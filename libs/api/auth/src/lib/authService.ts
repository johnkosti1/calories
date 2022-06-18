import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '@calories/api/users';
import { IUser, IUserServer } from '@calories/utils/types';
import { IAuthorizedDto } from '@calories/utils/types';

import { LoginDto } from './LoginDto';

function normalizeUser(user: IUserServer): IUser {
  return {
    _id: '' + user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    caloriePerDay: user.caloriePerDay,
    budgetPerMonth: user.budgetPerMonth
  };
}

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return normalizeUser(user);
    }
    return null;
  }

  async login(credentials: LoginDto): Promise<IAuthorizedDto> {
    const user: IUser = await this.validateUser(credentials.username, credentials.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      user,
      access_token: this.createJwtPayload(user)
    };
  }

  public async validateUserByJwt(payload: IUser) {
    const user = await this.usersService.findOne(payload.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return normalizeUser(user);
  }

  protected createJwtPayload(user) {
    return this.jwtService.sign(user);
  }
}
