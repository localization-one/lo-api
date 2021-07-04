import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorModel } from '../error/error.model';
import { Errors } from '../error/errors.enum';

export const hasNoValue = (property: any) => {
  const isNull = property === null;
  const isUndefined = property === undefined;
  const isWhitespace = property === '';
  return isNull || isUndefined || isWhitespace;
}

const validateDto = (dto: any, fields: string[]): ErrorModel[] => {
  const errors: ErrorModel[] = [];
  fields.forEach(e => {
    if(hasNoValue(dto[e])) {
      errors.push(ErrorModel.buildError({param: e, errorCode: Errors.VALUE_REQUIRED}))
    }
  });
  return errors;
}

export const isNullOrWhitespace = createParamDecorator<string[], ExecutionContext>((fields: string[], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { body } = request;
  const errors = validateDto(body, fields);
  if (errors.length > 0) {
    throw new HttpException(errors, HttpStatus.BAD_REQUEST);
  }
  return body;
});

