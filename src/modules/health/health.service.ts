import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config';

@Injectable()
export class HealthService {
  constructor(private readonly appConfigService: AppConfigService) {}
  checkHealth() {
    const environment = this.appConfigService.environment;
    const appName = this.appConfigService.appName;
    const appVersion = this.appConfigService.appVersion;

    return `Status: ok. Date: ${new Date()} Environment: ${environment}, Application: ${appName} Version ${appVersion}`;
  }
}
