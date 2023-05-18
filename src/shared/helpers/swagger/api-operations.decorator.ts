import { ApiOperation } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function ApiNamedOperation(options: Partial<OperationObject>) {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    ApiOperation({
      operationId: key,
      ...options,
    })(target, key, descriptor as any);
    return descriptor;
  };
}
