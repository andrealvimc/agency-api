import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums';
// import { Role } from '../interfaces/user.interface';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
