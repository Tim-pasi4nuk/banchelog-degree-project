import { applyDecorators } from '@nestjs/common';
import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ElangCode } from 'src/shared/types';

@ValidatorConstraint({ name: 'IsLangPropertyExists', async: false })
export class LangPropertyExists implements ValidatorConstraintInterface {
  validate(attribute: any) {
    if (typeof attribute !== 'object') return false;

    return Object.keys(attribute).some(
      (key) =>
        key === ElangCode.EN || key === ElangCode.RU || key === ElangCode.UK,
    );
  }

  defaultMessage() {
    return `Object should exist at least of elements ${Object.values(
      ElangCode,
    ).toString()}`;
  }
}

export function IsLangPropertyExists() {
  return applyDecorators(applyDecorators(Validate(LangPropertyExists)));
}
