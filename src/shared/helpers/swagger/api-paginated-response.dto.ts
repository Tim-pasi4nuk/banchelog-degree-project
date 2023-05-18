import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class Paginated<D> {
  @ApiProperty()
  total?: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  pagesAmount: number;

  @ApiHideProperty()
  data: D;
}
