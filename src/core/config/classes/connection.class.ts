import { ConnectionOptions } from 'typeorm';
import { configService, ConfigService } from '../index';
import { DB_KEYS } from '../types';

const buildConfig = (config: ConfigService = configService): ConnectionOptions => {
  return {
    type: 'postgres',
    host: config.get<DB_KEYS>('DB_HOST'),
    port: +config.get<DB_KEYS>('DB_PORT'),
    username: config.get<DB_KEYS>('DB_USER'),
    password: config.get<DB_KEYS>('DB_PASSWORD'),
    database: config.get<DB_KEYS>('DB'),
    entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../../database/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
    logging: true,
    logger: 'file',
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };
};


export { buildConfig };
