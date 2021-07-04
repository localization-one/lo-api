import { Controller, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiTags } from '@nestjs/swagger';
import { Team } from '@modules/teams/entities/team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamsService.getAllTeams();
  }
}
