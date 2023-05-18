import { registerDecorator } from 'class-validator';

export function IsFutureDateString() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isFutureDateString',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'Date should be in the future',
      },
      validator: {
        validate(value: any) {
          return (
            value &&
            typeof value === 'string' &&
            new Date(value).getTime() > Date.now()
          );
        },
      },
    });
  };
}
