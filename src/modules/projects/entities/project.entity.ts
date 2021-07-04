import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { TextColumn } from '@infrastructure/decorators';
import { Team } from '@modules/teams/entities/team.entity';


@Entity({ name: 'projects', schema: SCHEMAS.PROJECTS })
class Project extends BaseEntity {
  @TextColumn()
  name: string;

  @TextColumn()
  origin: string;

  @TextColumn({ nullable: true })
  description: string;

  @OneToMany(() => Team, team => team.project)
  teams: Team[];
}

export { Project };
