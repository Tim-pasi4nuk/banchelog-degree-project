import { Global, Module } from '@nestjs/common';

import { AppConfigService } from './app-config.service';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
