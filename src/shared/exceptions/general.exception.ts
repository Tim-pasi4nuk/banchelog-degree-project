import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class GeneralException extends AppException {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'GeneralException', message);
  }
}
