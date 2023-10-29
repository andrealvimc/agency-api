import { IsString } from 'class-validator';

export class CreateCreativeDto {
  @IsString()
  name: string;

  @IsString()
  format: string;

  @IsString()
  categoryId: string;
}
