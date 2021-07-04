import { ApiProperty } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({
    example: 'first@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'Peaceisshit1994',
    required: true,
  })
  password: string;
}

export { LoginDto };
