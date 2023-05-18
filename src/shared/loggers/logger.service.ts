import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { AppConfigService } from 'src/config';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private readonly appConfig: AppConfigService) {
    this.initializeLogger();
  }

  private format(
    message: string,
    params?: Record<string, unknown>,
  ): Record<string, unknown> {
    return {
      _application: this.appConfig.appName,
      _stage: this.appConfig.environment,
      timestamp: new Date().toISOString(),
      message,
      ...params,
    };
  }

  initializeLogger(): void {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, _context?, params?: Record<string, unknown>): void {
    this.logger.info(this.format(message, params));
  }

  info(message: string, params?: Record<string, unknown>): void {
    this.logger.info(this.format(message, params));
  }

  error(message: string, trace: string): void {
    this.logger.error(JSON.stringify(this.format(message, { trace })));
  }

  warn(message: string): void {
    this.logger.warn(JSON.stringify(this.format(message)));
  }

  warning(message: string): void {
    this.logger.warn(JSON.stringify(this.format(message)));
  }

  debug(message: string): void {
    this.logger.debug(JSON.stringify(this.format(message)));
  }

  verbose(message: string): void {
    this.logger.verbose(JSON.stringify(this.format(message)));
  }
}
