import { ApiProperty } from '@nestjs/swagger';

class CreateTeamDto {
  @ApiProperty({example: 'Development'})
  name: string;
  
  @ApiProperty({example: 'Reviewing and applying changes'})
  description: string;
}


export { CreateTeamDto };
