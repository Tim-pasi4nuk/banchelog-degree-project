import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiTraceHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'x-trace-id',
      description: 'TraceId',
    }),
  );
}
