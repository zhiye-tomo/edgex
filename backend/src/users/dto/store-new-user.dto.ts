import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterNewUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
