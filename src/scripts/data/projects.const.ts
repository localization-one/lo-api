import { Project } from '@modules/projects/entities/project.entity';
import { OmitEntity } from '../../database';
import { configService, Configuration } from '@core/config';

const PROJECTS: OmitEntity<Project>[] = [
  {
    name: 'LOCAL_DEV',
    origin:
      'http://localhost' + configService.get<Configuration>('APPLICATION_PORT'),
    description: 'For local development from swagger',
    teams: [],
  },
  {
    name: 'LOCAL_FRONT',
    origin: 'http://localhost:4200',
    description: 'For local development from front',
    teams: [],
  },
];



export { PROJECTS };
