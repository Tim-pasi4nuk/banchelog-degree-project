import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): any {
    const timeRequest = Date.now();

    res.on('close', () => {
      const timeResponse = Date.now();
      const delay = timeResponse - timeRequest;

      this.logger.log(res.statusMessage, undefined, {
        timeResponse,
        delay,
        statusCode: res.statusCode,
        request: {
          method: req.method,
          body: req.body,
        },
        response: '', // todo
      });
    });
    next();
  }
}
