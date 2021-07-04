import { EntityRepository } from 'typeorm';
import { Language } from '@modules/languages/entities/language.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(Language)
class LanguagesRepository extends BaseRepository<Language> {}


export { LanguagesRepository };
