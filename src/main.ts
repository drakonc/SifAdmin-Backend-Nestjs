import { SwaggerTarget } from './swApi/optSwagger';
import { AppModule } from './api/app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  const port = AppModule.port;

  const sw = new SwaggerTarget(app);
  sw.Start();

  await app.listen(port, () => {
    Logger.log(`Corriendo en el Perto ${port}`, 'ApiRunning', false);
  });

}

bootstrap();