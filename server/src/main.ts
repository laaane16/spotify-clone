import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Spotify')
    .setDescription('The sings API')
    .setVersion('1.0')
    .addTag('sings')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/api/docs', app, documentFactory);

  app.setGlobalPrefix('/v1/api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
