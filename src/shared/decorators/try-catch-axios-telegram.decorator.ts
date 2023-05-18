import { AppException } from '../exceptions/app.exception';

/**
 * @description Catch Wrapper for async typeOrm
 */
export const TryCatchAxiosTelegram =
  (): any =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (descriptor && descriptor?.value?.constructor?.name == 'AsyncFunction') {
      _generateDescriptor(descriptor);
    } else {
      for (const propertyName of Reflect.ownKeys(target.prototype).filter(
        (prop) => prop !== 'constructor',
      )) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const desc = Object.getOwnPropertyDescriptor(
          target.prototype,
          propertyName,
        )!;
        const isAsyncMethod =
          desc.value instanceof Function &&
          desc?.value?.constructor?.name == 'AsyncFunction';

        if (!isAsyncMethod) continue;

        Object.defineProperty(
          target.prototype,
          propertyName,
          _generateDescriptor(desc),
        );
      }
    }
  };

function _generateDescriptor(
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const result = originalMethod.apply(this, args);

    const prefix = `[${this.constructor.name}][${originalMethod.name}]`;

    return result.catch((error: any) => {
      throw new AppException(
        error.response?.status || error.status || 500,
        `[TELEGRAM_ERROR] ${error.response?.statusText}`,
        error.response?.data?.description || error.essage,
        { serviceStack: prefix },
      );
    });
  };
  return descriptor;
}
