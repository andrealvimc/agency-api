import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
