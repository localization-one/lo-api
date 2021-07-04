import { ConnectionOptions } from 'typeorm';
import { configService } from './services';


const config: ConnectionOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: true,
  logger: 'file',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
