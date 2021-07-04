import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService, Configuration } from './core/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Localization API')
    .setDescription('Localization API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(
    configService.get<Configuration>('APPLICATION_PORT'),
    '0.0.0.0',
  );
}
bootstrap();
