import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserDetailsRepository,
  UserPreferencesRepository,
  UserRolesRepository,
  UsersRepository,
} from '@modules/users/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      UserRolesRepository,
      UserPreferencesRepository,
      UserDetailsRepository,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
