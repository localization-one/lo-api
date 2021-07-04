import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorModel } from '../error/error.model';
import { Errors } from '../error/errors.enum';

export const areEqual = (value: string, valueToCompare: string): boolean => {
  return value === valueToCompare;
};

export const fieldsAreEqual = createParamDecorator<string[], ExecutionContext>(
  (fields: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { body } = request;
    if (areEqual(body[fields[0]], body[fields[1]])) {
      return body;
    }
    const errors = [
      ErrorModel.buildError({
        errorCode: Errors.PASSWORD_CONFIRMATION_INVALID,
        param: fields[0],
      }),
      ErrorModel.buildError({
        errorCode: Errors.PASSWORD_CONFIRMATION_INVALID,
        param: fields[1],
      }),
    ];
    throw new HttpException(errors, HttpStatus.BAD_REQUEST);
  },
);
