import { IsUUID } from 'class-validator';

export class IdParamUuidDto {
  @IsUUID()
  id: string;
}
