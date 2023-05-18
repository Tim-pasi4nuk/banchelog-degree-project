import { IsString } from 'class-validator';

export class IdParamPhoneDto {
  @IsString()
  phone: string;
}
