import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Project } from '@modules/projects/entities/project.entity';
import { CreateProjectDto } from '@modules/projects/dtos';
import { ID } from '@infrastructure/types';
import { ProjectProperties } from '@modules/projects/entities/project-properties.entity';
import { Team } from '@modules/teams/entities/team.entity';
import { CreateTeamDto } from '@modules/teams/dtos';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Post()
  async createProject(
    @Body()
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get(':project_id/activate')
  @ApiParam({ name: 'project_id', required: true })
  async activateProject(@Param('project_id') project_id: ID): Promise<Project> {
    return this.projectsService.activateProject({ id: project_id });
  }

  @Get(':project_id/deactivate')
  @ApiParam({ name: 'project_id', required: true })
  async deactivateProject(
    @Param('project_id') project_id: ID,
  ): Promise<Project> {
    return this.projectsService.deactivateProject({ id: project_id });
  }

  @Get(':project_id/verify')
  @ApiParam({ name: 'project_id', required: true })
  async verifyProject(@Param('project_id') project_id: ID): Promise<Project> {
    return this.projectsService.verifyProject({ id: project_id });
  }

  @Get('props/:project_id')
  @ApiParam({ name: 'project_id', required: true })
  async getProps(
    @Param('project_id') project_id: ID,
  ): Promise<ProjectProperties> {
    return this.projectsService.getProps({ id: project_id });
  }

  @Get('teams/:project_id')
  @ApiParam({ name: 'project_id', required: true })
  async getTeams(@Param('project_id') project_id: ID): Promise<Team[]> {
    return this.projectsService.getTeams({ id: project_id });
  }

  @Post('teams/:project_id')
  @ApiParam({ name: 'project_id', required: true })
  async createTeam(
    @Param('project_id') project_id: ID,
    @Body() teamDto: CreateTeamDto,
  ): Promise<Team> {
    return this.projectsService.createTeam({ id: project_id }, teamDto);
  }
}
