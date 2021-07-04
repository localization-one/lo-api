import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { TextColumn } from '@infrastructure/decorators';
import { Project } from '@modules/projects/entities/project.entity';
import { TeamRole } from '@modules/teams/entities/team-role.entity';
import { TeamOptions } from '@modules/teams/entities/team-options.entity';

@Entity({ name: 'teams', schema: SCHEMAS.PROJECTS })
export class Team extends BaseEntity {
  @TextColumn()
  name: string;

  @TextColumn()
  description: string;

  @ManyToOne(
    () => Project,
    project => project.teams,
  )
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project: Project['id'];

  @OneToMany(
    () => TeamRole,
    teamRole => teamRole.team,
  )
  roles: TeamRole[];

  @OneToOne(
    () => TeamOptions,
    options => options.team,
  )
  @JoinColumn({
    name: 'options_id',
    referencedColumnName: 'id',
  })
  options: TeamOptions;
}
