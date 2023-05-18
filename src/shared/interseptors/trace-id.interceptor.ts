import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  SetMetadata,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TraceIdInterseptors<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      tap(() => {
        const [req, res] = context.getArgs();
        const traceId = req.headers['x-trace-id'];
        SetMetadata('traceId', traceId);
        res.header('x-trace-id', traceId);
      }),
    );
  }
}
