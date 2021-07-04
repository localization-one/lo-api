import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  LanguageConfigurationsRepository,
  LanguagesRepository,
} from '@modules/languages';
import { Language } from '@modules/languages/entities/language.entity';
import { LanguageConfiguration } from '@modules/languages/entities/language-configuration.entity';
import { CreateLanguageConfigurationDto } from '@modules/languages/dtos';
import { ProjectsService } from '@modules/projects/projects.service';
import { Project } from '@modules/projects/entities/project.entity';
import { ProjectProperties } from '@modules/projects/entities/project-properties.entity';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly languagesRepository: LanguagesRepository,
    private readonly languageConfigurationsRepository: LanguageConfigurationsRepository,
    private readonly projectsService: ProjectsService,
  ) {}
  async getAllLanguages(): Promise<Language[]> {
    return this.languagesRepository.findAll();
  }
  async getAllConfigurations(): Promise<LanguageConfiguration[]> {
    return this.languageConfigurationsRepository
      .createQueryBuilder('lc')
      .leftJoinAndMapOne('lc.language', Language, 'l', 'lc.language_id = l.id')
      .leftJoinAndMapOne('lc.projectProps', ProjectProperties, 'pp', 'lc.project_props_id = pp.id')
      .leftJoinAndMapOne('pp.project', Project, 'p', 'pp.project_id = p.id')
      .getMany();
  }
  async createConfiguration(
    { id: language_id }: Pick<Language, 'id'>,
    languageConfigurationDto: CreateLanguageConfigurationDto,
  ): Promise<LanguageConfiguration> {
    const language: Language = await this.languagesRepository.findOne({
      where: { id: language_id },
    });

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    const project: Project = await this.projectsService.findById({
      id: languageConfigurationDto.project_id,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const projectProps: ProjectProperties = await this.projectsService.getProps(
      { id: project.id },
    );

    if (!projectProps) {
      throw new NotFoundException('Project does not configured properly');
    }

    const languageConfigurations: LanguageConfiguration[] = await this.languageConfigurationsRepository
      .createQueryBuilder('lc')
      .leftJoin('lc.language', 'l')
      .select(['lc.active', 'lc.default', 'l.id AS language'])
      .where('lc.project_props_id = :project_props_id', {
        project_props_id: projectProps['id'],
      })
      .getMany();

    let languageConfiguration: LanguageConfiguration;
    languageConfiguration = languageConfigurations.find(
      (lc: LanguageConfiguration) => lc.language === language['id'],
    );

    if (languageConfiguration) {
      throw new BadRequestException(
        'Project already contains configuration for this language',
      );
    }

    const defaultConfiguration: LanguageConfiguration = languageConfigurations.find(
      (lc: LanguageConfiguration) => lc.default,
    );

    if (defaultConfiguration) {
      throw new BadRequestException(
        'Project already contains language configuration which set as default',
      );
    }

    languageConfiguration = this.languageConfigurationsRepository.create({
      language: language['id'],
      projectProps: projectProps['id'],
      active: true,
      default: true,
    });

    return this.languageConfigurationsRepository.save(languageConfiguration);
  }
}
