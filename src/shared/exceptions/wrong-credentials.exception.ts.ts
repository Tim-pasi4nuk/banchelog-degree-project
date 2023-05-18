import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class WrongCredentialsException extends AppException {
  constructor(message?: string) {
    super(
      HttpStatus.UNAUTHORIZED,
      'WrongCredentialsException',
      message || 'Wrong credentials provided',
    );
  }
}
