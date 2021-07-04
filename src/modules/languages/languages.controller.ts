import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Language } from '@modules/languages/entities/language.entity';
import { LanguageConfiguration } from '@modules/languages/entities/language-configuration.entity';
import { ID } from '@infrastructure/types';
import { CreateLanguageConfigurationDto } from '@modules/languages';

@ApiTags('Languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}
  @Get()
  async getAllLanguages(): Promise<Language[]> {
    return this.languagesService.getAllLanguages();
  }
  @Get('configurations')
  async getAllConfigurations(): Promise<LanguageConfiguration[]> {
    return this.languagesService.getAllConfigurations();
  }
  @Post('configurations/:language_id')
  @ApiParam({ name: 'language_id', required: true })
  async createConfiguration(
    @Param('language_id') language_id: ID,
    @Body() languageConfigurationDto: CreateLanguageConfigurationDto,
  ): Promise<LanguageConfiguration> {
    return this.languagesService.createConfiguration(
      { id: language_id },
      languageConfigurationDto,
    );
  }
}
