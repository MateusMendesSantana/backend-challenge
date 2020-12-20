import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
