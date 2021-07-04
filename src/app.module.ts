import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildConfig } from '@core/config';
import { ProjectsModule } from '@modules/projects';
import { LanguagesModule } from '@modules/languages';
import { UsersModule } from '@modules/users';
import { TeamsModule } from '@modules/teams';
import { AuthModule } from '@modules/auth';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...buildConfig() }),
    AuthModule,
    UsersModule,
    LanguagesModule,
    ProjectsModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
