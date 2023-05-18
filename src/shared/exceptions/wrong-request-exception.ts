import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class WrongRequestException extends AppException {
  constructor(message: string, construction?: any) {
    super(
      HttpStatus.BAD_REQUEST,
      'WrongRequestException',
      message,
      construction,
    );
  }
}
