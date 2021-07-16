import { Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users';
import { LoginDto } from '@modules/auth/dtos';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findByEmail({email: loginDto.email});
    return user;
  }
}
