import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAgencyDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  cnpj: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @IsEmail()
  ownerEmail: string;
}
