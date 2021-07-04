import { ApiProperty } from '@nestjs/swagger';
import { ID } from '@infrastructure/types';

class CreateLanguageConfigurationDto {
  @ApiProperty({ required: true, description: 'Project ID' })
  project_id: ID;

  @ApiProperty({ required: true, example: true })
  active: boolean;

  @ApiProperty({ required: true, example: false })
  default: boolean;
}

export { CreateLanguageConfigurationDto };
