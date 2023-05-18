import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerConfig } from 'src/config';
import { ApiNamedOperation } from 'src/shared';
import { ApiTraceHeader } from 'src/shared/helpers/swagger/api-trace-id-header.decorator';
import { HealthService } from './health.service';

@ApiTags(SwaggerConfig.tags.health)
@Controller('health')
@ApiTraceHeader()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiNamedOperation({ summary: 'Get server status' })
  public checkHealth() {
    return { data: this.healthService.checkHealth() };
  }
}
