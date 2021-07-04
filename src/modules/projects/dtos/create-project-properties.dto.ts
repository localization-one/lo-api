import { ApiProperty } from '@nestjs/swagger';
import { ID } from '@infrastructure/types';

class CreateProjectPropertiesDto {
  @ApiProperty({required: true})
  project_id: ID;
  @ApiProperty({default: false})
  active: boolean;
  @ApiProperty({default: false})
  verified: boolean;
}

export { CreateProjectPropertiesDto };
