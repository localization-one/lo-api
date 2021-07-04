import { EntityRepository } from 'typeorm';
import { UserRole } from '@modules/users/entities/user-role.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(UserRole)
class UserRolesRepository extends BaseRepository<UserRole> {}

export { UserRolesRepository };
