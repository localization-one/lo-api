import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { TextColumn } from '@infrastructure/decorators';
import { LanguageConfiguration } from '@modules/languages/entities/language-configuration.entity';

@Entity({ name: 'languages', schema: SCHEMAS.LANGUAGES })
@Index(['alpha2', 'name'], { unique: true })
class Language extends BaseEntity {
  @Column({ length: 2 })
  alpha2: string;

  @TextColumn()
  name: string;

  @TextColumn()
  nativeName: string;

  @OneToMany(() => LanguageConfiguration, configuration => configuration.language)
  configurations!: LanguageConfiguration[];
}

export { Language };
