import { EntityRepository } from 'typeorm';
import { Team } from '@modules/teams/entities/team.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(Team)
class TeamsRepository extends BaseRepository<Team> {}

export { TeamsRepository };
