import { EntityRepository } from 'typeorm';
import { UserPreferences } from '@modules/users/entities/user-preferences.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(UserPreferences)
class UserPreferencesRepository extends BaseRepository<UserPreferences> {}

export { UserPreferencesRepository };
