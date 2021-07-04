import { Connection } from 'typeorm';

interface SeedGenerateScript {
  insertInto<T>(connection: Connection, raw?: T): Promise<void>;
}

export { SeedGenerateScript };
