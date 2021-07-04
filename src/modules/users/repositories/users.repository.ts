import { EntityRepository } from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(User)
class UsersRepository extends BaseRepository<User> {}

export { UsersRepository };
