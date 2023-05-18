import { IsString } from 'class-validator';

export class IdParamChannelDto {
  @IsString()
  id: string;
}
