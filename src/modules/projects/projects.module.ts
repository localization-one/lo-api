import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProjectPropertiesRepository,
  ProjectsRepository,
} from '@modules/projects/repositories';
import { TeamsModule } from '@modules/teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectsRepository,
      ProjectPropertiesRepository,
    ]),
    TeamsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
