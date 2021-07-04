import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { BooleanColumn } from '@infrastructure/decorators';
import { Language } from '@modules/languages/entities/language.entity';
import { ProjectProperties } from '@modules/projects/entities/project-properties.entity';

@Entity({ name: 'language-configurations', schema: SCHEMAS.LANGUAGES })
class LanguageConfiguration extends BaseEntity {
  @BooleanColumn({ default: true })
  active: boolean;

  @BooleanColumn({ default: false })
  default: boolean;

  @ManyToOne(
    () => Language,
    language => language.configurations,
  )
  @JoinColumn({
    name: 'language_id',
    referencedColumnName: 'id',
  })
  language!: Language['id'];

  @ManyToOne(
    () => ProjectProperties,
    projectProps => projectProps.languageConfigurations,
  )
  @JoinColumn({
    name: 'project_props_id',
    referencedColumnName: 'id',
  })
  projectProps: ProjectProperties['id'];
}

export { LanguageConfiguration };
