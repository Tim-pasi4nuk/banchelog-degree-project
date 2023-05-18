import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware, LoggerModule } from './shared/loggers';
import { AppConfigModule } from './config';
import { DbModule } from './core/db';

import {
  HealthModule,
} from './modules';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DbModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
