import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const apiKeyFromRequest = request.headers['x-api-key'];
    const apiKeyFromEnv = this.configService.get('API_KEY');

    return apiKeyFromRequest === apiKeyFromEnv;
  }
}
