import { EntityRepository } from 'typeorm';
import { ProjectProperties } from '@modules/projects/entities/project-properties.entity';
import { BaseRepository } from '@base/base-repository';

@EntityRepository(ProjectProperties)
class ProjectPropertiesRepository extends BaseRepository<ProjectProperties> {}

export { ProjectPropertiesRepository };
