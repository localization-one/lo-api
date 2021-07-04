import { EntityRepository } from 'typeorm';
import { TeamRole } from '@modules/teams/entities/team-role.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(TeamRole)
class TeamRolesRepository extends BaseRepository<TeamRole> {}

export { TeamRolesRepository };
