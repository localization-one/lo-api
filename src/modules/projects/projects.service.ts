import { Injectable } from '@nestjs/common';
import { Project } from '@modules/projects/entities/project.entity';
import {
  ProjectPropertiesRepository,
  ProjectsRepository,
} from '@modules/projects/repositories';
import { CreateProjectDto } from '@modules/projects/dtos';
import { ProjectProperties } from '@modules/projects/entities/project-properties.entity';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { TeamsService } from '@modules/teams/teams.service';
import { Team } from '@modules/teams/entities/team.entity';
import { CreateTeamDto } from '@modules/teams/dtos';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly projectPropertiesRepository: ProjectPropertiesRepository,
    private readonly teamsService: TeamsService,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectsRepository
      .createQueryBuilder('p')
      .leftJoinAndMapOne(
        'p.props',
        ProjectProperties,
        'pp',
        'pp.project_id = p.id',
      )
      .getMany();
  }

  async findById(
    { id }: Pick<Project, 'id'>,
    detailed = false,
  ): Promise<Project> {
    const qb: SelectQueryBuilder<Project> = this.projectsRepository
      .createQueryBuilder('p')
      .where('p.id = :id', { id });

    if (detailed) {
      qb.leftJoinAndMapMany('p.teams', Team, 'team', 'team.project_id = p.id');
    }

    return qb.getOne();
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    let project: Project = this.projectsRepository.create(createProjectDto);

    const qr: QueryRunner = await this.projectsRepository.startTransaction();

    try {
      project = await this.projectsRepository.save(project);

      const projectProps: ProjectProperties = qr.manager.create<
        ProjectProperties
      >(ProjectProperties, {
        project: project['id'],
      });

      await qr.manager.save(projectProps);

      await qr.commitTransaction();

      return project;
    } catch (err) {
      await qr.rollbackTransaction();
      throw err;
    } finally {
      await qr.release();
    }
  }

  async activateProject({ id }: Pick<Project, 'id'>): Promise<Project> {
    const project: Project = await this.projectsRepository
      .createQueryBuilder('p')
      .leftJoinAndMapOne(
        'p.props',
        ProjectProperties,
        'pp',
        'pp.project_id = p.id',
      )
      .where('p.id = :id', { id })
      .getOne();
    return project;
  }

  async deactivateProject({ id }: Pick<Project, 'id'>): Promise<Project> {
    const project: Project = await this.projectsRepository
      .createQueryBuilder('p')
      .leftJoinAndMapOne(
        'p.props',
        ProjectProperties,
        'pp',
        'pp.project_id = p.id',
      )
      .where('p.id = :id', { id })
      .getOne();
    return project;
  }

  async verifyProject({ id }: Pick<Project, 'id'>): Promise<Project> {
    const project: Project = await this.projectsRepository
      .createQueryBuilder('p')
      .leftJoinAndMapOne(
        'p.props',
        ProjectProperties,
        'pp',
        'pp.project_id = p.id',
      )
      .where('p.id = :id', { id })
      .getOne();
    return project;
  }

  async getProps({
    id: project_id,
  }: Pick<Project, 'id'>): Promise<ProjectProperties> {
    return this.projectPropertiesRepository
      .createQueryBuilder('pp')
      .where('pp.project_id = :project_id', { project_id })
      .getOne();
  }

  async getTeams({ id: project_id }: Pick<Project, 'id'>): Promise<Team[]> {
    return this.teamsService.getProjectTeams({ id: project_id });
  }

  async createTeam(
    { id: project_id }: Pick<Project, 'id'>,
    teamDto: CreateTeamDto,
  ): Promise<Team> {
    return this.teamsService.createProjectTeam({ id: project_id }, teamDto);
  }
}
