import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TeamRolesRepository,
  TeamsRepository,
} from '@modules/teams/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([TeamsRepository, TeamRolesRepository])],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
