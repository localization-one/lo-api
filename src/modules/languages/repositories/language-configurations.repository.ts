import { EntityRepository } from 'typeorm';
import { LanguageConfiguration } from '@modules/languages/entities/language-configuration.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(LanguageConfiguration)
class LanguageConfigurationsRepository extends BaseRepository<
  LanguageConfiguration
> {}

export { LanguageConfigurationsRepository };
