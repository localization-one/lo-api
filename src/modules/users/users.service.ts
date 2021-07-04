import { Injectable } from '@nestjs/common';
import {
  UserDetailsRepository,
  UserPreferencesRepository,
  UsersRepository,
} from '@modules/users/repositories';
import { User } from '@modules/users/entities/user.entity';
import { CreateUserDto } from '@modules/users/dtos';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { UserDetails } from '@modules/users/entities/user-details.entity';
import { UserPreferences } from '@modules/users/entities/user-preferences.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private userDetailsRepository: UserDetailsRepository,
    private userPreferencesRepository: UserPreferencesRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const qb: SelectQueryBuilder<User> = this.usersRepository
      .createQueryBuilder('u')
      .leftJoinAndMapOne('u.details', UserDetails, 'ud', 'ud.user_id = u.id')
      .leftJoinAndMapOne(
        'u.preferences',
        UserPreferences,
        'up',
        'up.user_id = u.id',
      );
    return qb.getMany();
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const qr: QueryRunner = await this.usersRepository.startTransaction();

    try {
      let user: User = qr.manager.create<User>(User, userDto);
      user = await qr.manager.save<User>(user);

      const userPreferences: UserPreferences = qr.manager.create<
        UserPreferences
      >(UserPreferences, { user: user['id'] });

      const userDetails: UserDetails = qr.manager.create<UserDetails>(
        UserDetails,
        { user: user['id'] },
      );

      // TODO: create roles in generate file

      const [preferences, details] = await Promise.all([
        qr.manager.save(userPreferences),
        qr.manager.save(userDetails),
      ]);

      console.log(preferences);
      console.log(details);
      await qr.commitTransaction();

      // Add class-transformer library
      return user;
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }
}
