import { Injectable } from '@nestjs/common';
import { TeamRolesRepository, TeamsRepository } from '@modules/teams/repositories';
import { Team } from '@modules/teams/entities/team.entity';
import { Project } from '@modules/projects/entities/project.entity';
import { SelectQueryBuilder } from 'typeorm';
import { CreateTeamDto } from '@modules/teams/dtos';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly teamRolesRepository: TeamRolesRepository,
  ) {}

  async getAllTeams(): Promise<Team[]> {
    return this.teamsRepository
      .createQueryBuilder('t')
      .leftJoinAndMapOne(
        't.project',
        Project,
        'project',
        't.project_id = project.id',
      )
      .getMany();
  }

  async getProjectTeams({
    id: project_id,
  }: Pick<Project, 'id'>): Promise<Team[]> {
    const qb: SelectQueryBuilder<Team> = this.teamsRepository
      .createQueryBuilder('t')
      .leftJoin('t.project', 'project_id')
      .where('project_id = :project_id', { project_id });
    return qb.getMany();
  }

  async createProjectTeam(
    { id: project_id }: Pick<Project, 'id'>,
    teamDto: CreateTeamDto,
  ): Promise<Team> {
    const team: Team = this.teamsRepository.create({
      project: project_id,
      ...teamDto,
    });
    return this.teamsRepository.save(team);
  }
}
