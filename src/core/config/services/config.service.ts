import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { ConfigServiceOptions } from '../interfaces';

class ConfigService {
  private readonly envConfig: { [key: string]: string };
  private readonly environment: string;
  constructor(options: ConfigServiceOptions) {
    this.environment = process.env.NODE_ENV ?? 'development';
    this.envConfig = dotenv.parse(readFileSync(options.filePath ?? `${this.environment}.env`));
  }
  isProduction(): boolean {
    return this.environment === 'production';
  }
  get<CONFIG_KEYS>(key: CONFIG_KEYS): string {
    return this.envConfig[(key as unknown) as string];
  }
}

export { ConfigService };
