import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config';

import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService, LoggerMiddleware],
})
export class LoggerModule {}
