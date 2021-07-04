import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { BooleanColumn, TextColumn } from '@infrastructure/decorators';
import { Team } from '@modules/teams/entities/team.entity';

@Entity({ name: 'team-roles', schema: SCHEMAS.PROJECTS })
export class TeamRole extends BaseEntity {
  @TextColumn()
  name: string;

  @TextColumn()
  description: string;

  @BooleanColumn({ default: true })
  active: boolean;

  @ManyToOne(
    () => Team,
    team => team.roles,
  )
  @JoinColumn({
    name: 'team_id',
    referencedColumnName: 'id',
  })
  team: Team['id'];
}
