import { ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty({ required: true, example: 'Joe' })
  firstName: string;

  @ApiProperty({ required: true, example: 'Doe' })
  lastName: string;

  @ApiProperty({ required: true, example: 'Peaceisshit1994' })
  password: string;
}

export { CreateUserDto };
