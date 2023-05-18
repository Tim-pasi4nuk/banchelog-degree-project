import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class RabbitMQPublisherException extends AppException {
  constructor(message: string, error?: any) {
    super(
      error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error?.code || 'RabbitMQException',
      error?.message || message,
    );
  }
}
