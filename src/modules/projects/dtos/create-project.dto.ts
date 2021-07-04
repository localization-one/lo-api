import { ApiProperty } from '@nestjs/swagger';

class CreateProjectDto {
  @ApiProperty({required: true, example: 'TEST PROJECT'})
  name: string;
  @ApiProperty({required: true, example: 'http://localhost:3000'})
  origin: string;
  @ApiProperty({example: 'For testing purpose'})
  description: string;
}

export { CreateProjectDto };
