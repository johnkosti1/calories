import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IUser } from '@calories/utils/types';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    return user ? user.isAdmin : true;
  }
}
