import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Spotify')
    .setDescription('The sings API')
    .setVersion('1.0')
    .addTag('sings')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/api/docs', app, documentFactory);

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(jwtService, reflector));
  app.setGlobalPrefix('/v1/api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
