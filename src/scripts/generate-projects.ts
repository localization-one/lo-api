import { SeedGenerateScript } from '../database';
import { Connection, createConnection } from 'typeorm';
import { buildConfig } from '@core/config';
import { buildColumns } from '@infrastructure/utils';
import { getDateNow } from '@base/date-functions';
import { Project } from '@modules/projects/entities/project.entity';
import { PROJECTS } from './data/projects.const';

class Generate implements SeedGenerateScript {
  async insertInto<Raw>(connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into<Project>(
        Project,
        buildColumns<Project>(
          'name',
          'origin',
          'description',
          'createdAt',
          'updatedAt',
        ),
      )
      .values(
        PROJECTS.map(
          (project: Project) => {
            return {
              name: project.name,
              origin: project.origin,
              description: project.description,
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
