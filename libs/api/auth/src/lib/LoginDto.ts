import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ILogin } from '@calories/utils/types';

export class LoginDto implements ILogin {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
