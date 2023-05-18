import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationParamsDto {
  @ApiPropertyOptional({
    description: 'How many items need to return',
  })
  @IsOptional()
  size?: number;

  @ApiPropertyOptional({
    description: 'Which page should be returned',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;
}
