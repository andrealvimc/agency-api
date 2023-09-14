import { IsEmail, IsString, Length } from 'class-validator';
import { AgencyType } from '../enums';

export class CreateAgencyDto {
  @IsString()
  name: string;

  @IsString()
  nameFantasy: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  document: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @IsEmail()
  ownerEmail: string;
}
