import { IsString } from 'class-validator';

export class DeleteAgencyDto {
  @IsString()
  id: string;
}
