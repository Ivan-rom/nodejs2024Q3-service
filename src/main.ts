import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'node:path';
import * as YAML from 'yamljs';
import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(port);
}
bootstrap();
