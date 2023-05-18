import { ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as Express from 'express';

import { AppConfigModule, AppConfigService } from './config';
import { AppModule } from './app.module';
import {
  WrongRequestException,
  LoggerModule,
  LoggerService,
  UnauthorizedExceptionFilter,
} from './shared';
import { TraceIdInterseptors } from './shared/interseptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  });

  const logger = app.select(LoggerModule).get(LoggerService);
  app.useLogger(logger);

  app.setGlobalPrefix('api/v1');
  app.use(Express.json({ limit: '50mb' }));
  app.use(Express.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        logger.log(`errors: ${JSON.stringify(errors)}`);

        return new WrongRequestException(
          'Validation Error!',
          appConfigService
            ? errors[0]?.constraints ||
              errors[0]?.children[0]?.constraints ||
              errors
            : undefined,
        );
      },
    }),
  );
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  app.useGlobalInterceptors(new TraceIdInterseptors());

  const appConfigService = app.select(AppConfigModule).get(AppConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appConfigService.appName)
    .setDescription(`${appConfigService.appName} description `)
    .setVersion(appConfigService.appVersion)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.startAllMicroservices();

  await app.listen(appConfigService.appPort);

  logger.log(
    `${appConfigService.appName} runing on port: ${appConfigService.appPort} `,
  );
}

bootstrap();
