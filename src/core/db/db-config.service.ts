import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { AppConfigService } from 'src/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.config.DATABASE_DIALECT,
      host: this.config.DATABASE_HOST,
      port: this.config.DATABASE_PORT,
      username: this.config.DATABASE_USER,
      password: this.config.DATABASE_PASSWORD,
      database: this.config.DATABASE_NAME,

      uuidExtension: 'pgcrypto',
      entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
      autoLoadEntities: true,

      synchronize: true,
    };
  }
}
