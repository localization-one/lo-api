import { ApiProperty } from '@nestjs/swagger';

class BasePaginationDto {
  @ApiProperty({ required: true, example: 1 })
  pageNumber: number;
  @ApiProperty({ required: true, example: 5 })
  pageSize: number;
}

export { BasePaginationDto };
