import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiControllerResponse<TModel extends Type<any>>(
  status: HttpStatus,
  Model: TModel | TModel[],
) {
  const isModelArray = Array.isArray(Model);
  const model = isModelArray ? Model[0] : Model;
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status,
      schema: isModelArray
        ? {
            required: ['data'],
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              message: {
                type: 'string',
              },
            },
          }
        : {
            required: ['data'],
            properties: {
              data: { $ref: getSchemaPath(model) },
              message: {
                type: 'string',
              },
            },
          },
    }),
  );
}
