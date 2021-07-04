import { EntityRepository } from 'typeorm';
import { UserDetails } from '@modules/users/entities/user-details.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(UserDetails)
class UserDetailsRepository extends BaseRepository<UserDetails> {}

export { UserDetailsRepository };
