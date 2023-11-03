import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  domain: string;

  @IsArray()
  @ArrayMinSize(1)
  colors: string[];

  @IsArray()
  @ArrayMinSize(1)
  logo: string[];

  @IsArray()
  @ArrayMinSize(1)
  emails: string[];
}
