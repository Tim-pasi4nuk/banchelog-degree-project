import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { AppConfigModule } from 'src/config';

@Module({
  imports: [AppConfigModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
