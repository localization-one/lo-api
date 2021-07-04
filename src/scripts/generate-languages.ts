import { SeedGenerateScript } from '../database';
import { Connection, createConnection } from 'typeorm';
import { buildConfig } from '@core/config';
import { Language } from '@modules/languages/entities/language.entity';
import { buildColumns } from '@infrastructure/utils';
import { getDateNow } from '@base/date-functions';
import { readFileSync } from 'fs';
import { join } from 'path';

class Generate implements SeedGenerateScript {
  async insertInto<Raw>(connection: Connection): Promise<void> {
    const languagesData = readFileSync(
      join(__dirname, './data/languages.json'),
    );
    const languages = JSON.parse((languagesData as unknown) as string);

    await connection
      .createQueryBuilder()
      .insert()
      .into<Language>(
        Language,
        buildColumns<Language>(
          'name',
          'alpha2',
          'nativeName',
          'createdAt',
          'updatedAt',
        ),
      )
      .values(
        languages.map(
          (language: Language) => {
            return {
              name: language.name,
              alpha2: language.alpha2,
              nativeName: language.nativeName,
              createdAt: getDateNow(),
              updatedAt: getDateNow(),
            };
          },
        ),
      )
      .execute();
  }
}

async function run(): Promise<void> {
  try {
    const connection: Connection = await createConnection(buildConfig());
    const generator: Generate = new Generate();
    await generator.insertInto(connection);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
