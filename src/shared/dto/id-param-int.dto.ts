import { IsInt } from 'class-validator';

export class IdParamIntDto {
  @IsInt()
  id: number;
}
