import { AppException } from '../exceptions/app.exception';

/**
 * @description Catch Wrapper for async typeOrm
 */
export const TryCatchDb =
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
        const isMethod = desc.value instanceof Function;

        if (!isMethod) continue;

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
        error.status || 500,
        `[POSTGRES_ERROR] ${error.code}`,
        error.message,
        { serviceStack: prefix },
      );
    });
  };
  return descriptor;
}
