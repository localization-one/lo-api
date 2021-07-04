import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { BooleanColumn } from '@infrastructure/decorators';
import { Project } from '@modules/projects/entities/project.entity';
import { LanguageConfiguration } from '@modules/languages/entities/language-configuration.entity';

@Entity({ name: 'project-properties', schema: SCHEMAS.PROJECTS })
export class ProjectProperties extends BaseEntity {
  @BooleanColumn({ default: false })
  verified: boolean;

  @BooleanColumn({ default: true })
  active: boolean;

  @OneToOne(
    () => Project,
  )
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  public readonly project!: Project['id'];

  @OneToMany(() => LanguageConfiguration, languageConfiguration => languageConfiguration.projectProps)
  languageConfigurations: LanguageConfiguration[];
}
