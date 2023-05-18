import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { Paginated } from './api-paginated-response.dto';

export function ApiPaginatedResponse<TModel extends Type<any>>(
  status: HttpStatus,
  model: TModel,
) {
  return applyDecorators(
    ApiExtraModels(Paginated, model),
    ApiResponse({
      status,
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          { $ref: getSchemaPath(Paginated) },
        ],
      },
    }),
  );
}
