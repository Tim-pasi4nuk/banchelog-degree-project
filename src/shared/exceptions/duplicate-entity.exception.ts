import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class DuplicateEntityException extends AppException {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, 'DuplicateEntityException', message);
  }
}
