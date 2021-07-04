import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { Team } from '@modules/teams/entities/team.entity';
import { SCHEMAS } from '../../../database';

@Entity({ name: 'team-options', schema: SCHEMAS.PROJECTS })
export class TeamOptions extends BaseEntity {
  @OneToOne(
    () => Team,
    team => team.options,
  )
  @JoinColumn({
    name: 'team_id',
    referencedColumnName: 'id',
  })
  team: Team;
}
