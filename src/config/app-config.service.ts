import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { EStage } from './types';
import * as appMeta from '../../package.json';

@Injectable()
export class AppConfigService {
  private readonly ENVIRONMENT: EStage;
  public readonly IS_DEVELOPMENT: boolean;
  public readonly IS_PRODUCTION: boolean;
  public readonly IS_LOCAL: boolean;

  public readonly DATABASE_DIALECT: 'postgres' | 'mariadb';
  public readonly DATABASE_HOST: string;
  public readonly DATABASE_PASSWORD: string;
  public readonly DATABASE_PORT: number;
  public readonly DATABASE_USER: string;
  public readonly DATABASE_NAME: string;

  private readonly APP_NAME: string;
  private readonly VERSION: string;
  private readonly PORT: number;

  readonly defaultBatchSize: number = 10;
  readonly defaultSkipSize: number = 0;

  constructor(private readonly configService: ConfigService) {

      this.ENVIRONMENT = configService.getOrThrow('ENVIRONMENT');
      this.DATABASE_DIALECT = configService.getOrThrow('DATABASE_DIALECT');
      this.DATABASE_HOST = configService.getOrThrow('DATABASE_HOST');
      this.DATABASE_PASSWORD = configService.getOrThrow('DATABASE_PASSWORD');
      this.DATABASE_PORT = configService.getOrThrow('DATABASE_PORT');
      this.DATABASE_USER = configService.getOrThrow('DATABASE_USER');
      this.DATABASE_NAME = configService.getOrThrow('DATABASE_NAME');


    this.IS_DEVELOPMENT = this.ENVIRONMENT === EStage.DEV;
    this.IS_PRODUCTION = this.ENVIRONMENT === EStage.PROD;
    this.IS_LOCAL = this.ENVIRONMENT === EStage.LOCAL;

    this.APP_NAME = appMeta.name;
    this.VERSION = appMeta.version;
    this.PORT = parseInt(configService.getOrThrow('PORT'), 10);
  }

  public get appName() {
    return this.APP_NAME;
  }

  public get appVersion() {
    return this.VERSION;
  }

  public get appPort() {
    return this.PORT;
  }

  public get environment() {
    return this.ENVIRONMENT;
  }
}
