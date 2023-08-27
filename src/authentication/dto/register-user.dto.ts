import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  name: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
