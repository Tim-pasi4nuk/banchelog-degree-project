import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class PermissionException extends AppException {
  constructor(message?: string) {
    super(
      HttpStatus.FORBIDDEN,
      'PermissionException',
      message || 'Insufficient access rights!',
    );
  }
}
