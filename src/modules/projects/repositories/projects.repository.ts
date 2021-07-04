import { EntityRepository } from 'typeorm';
import { Project } from '@modules/projects/entities/project.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(Project)
class ProjectsRepository extends BaseRepository<Project> {}

export { ProjectsRepository };
