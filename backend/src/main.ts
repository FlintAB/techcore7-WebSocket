import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: false,
    forbidNonWhitelisted: true,
  })

  await app.useGlobalPipes(validationPipe)

  await app.listen(port);
}

void bootstrap();