import { ErrorType } from './error-type.enum';
export interface IError<DTO = any> {
  errorCode: number | string;
  errorType: ErrorType;
  param: keyof DTO | string;
  value?: string;
}
