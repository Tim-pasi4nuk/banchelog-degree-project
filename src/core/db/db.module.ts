import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from 'src/config';
import { TypeOrmConfigService } from './db-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class DbModule {}
