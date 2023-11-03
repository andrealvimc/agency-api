import { NestFactory } from '@nestjs/core';
import * as csurf from 'csurf';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // app.use(csurf());

  // TODO: ADICIONAR UM VALIDADOR WHITELIST PARA OS CLIENTES
  const cors: CorsOptions = {
    origin: [
      'http://localhost:3000',
      'https://app.agenciaescalavel.com.br',
      'https://lp.agencia123.com.br',
      'https://landingpage-test-xi.vercel.app',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  };

  app.enableCors(cors);

  await app.listen(3333);
}
bootstrap();
