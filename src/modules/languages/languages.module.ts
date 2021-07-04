import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  LanguageConfigurationsRepository,
  LanguagesRepository,
} from '@modules/languages/repositories';
import { ProjectsModule } from '@modules/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LanguagesRepository,
      LanguageConfigurationsRepository,
    ]),
    ProjectsModule
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
