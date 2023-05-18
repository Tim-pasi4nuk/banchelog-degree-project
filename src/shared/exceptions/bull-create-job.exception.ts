import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class BullCreateJobException extends AppException {
  constructor(message?: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'BULLCREATE_JOB_ERROR',
      message || 'Create job failed',
    );
  }
}
