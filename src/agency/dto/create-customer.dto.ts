import { IsEmail, IsString, Length, isString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  name: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsString()
  agencyId: string;

  // @IsString()
  // agencyRole: string;
}
