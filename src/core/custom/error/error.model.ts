import { ErrorType } from './error-type.enum';
import { IError } from './error.interface';
import { Errors } from './errors.enum';
/**
 *
 *
 * @export
 * @class ErrorModel
 * @implements {IError}
 */
export class ErrorModel<DTO = any> implements IError<DTO> {
  errorCode: Errors;
  errorType: ErrorType;
  param: keyof DTO | string;
  value?: string;
  /**
   *
   *
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  static buildGeneralError<DTO = any>(
    error: Pick<ErrorModel<DTO>, | 'errorCode'>,
  ): ErrorModel<DTO> {
    return this.buildError({
      param: 'general',
      errorCode: error.errorCode,
    });
  }
  /**
   *
   *
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  static buildBlank<DTO = any>(
    error: Pick<ErrorModel<DTO>, 'param' | 'errorCode'>,
  ): ErrorModel<DTO> {
    return this.buildParameterizedError({
      param: error.param,
      errorCode: error.errorCode,
      errorType: ErrorType.Blank,
    });
  }
  /**
   *
   *
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  static buildInfo<DTO = any>(error: Pick<ErrorModel<DTO>, 'param' | 'errorCode'>): ErrorModel<DTO> {
    return this.buildParameterizedError({
      param: error.param,
      errorCode: error.errorCode,
      errorType: ErrorType.Info,
    });
  }
  /**
   *
   *
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  static buildWarning<DTO = any>(
    error: Pick<ErrorModel<DTO>, 'param' | 'errorCode'>,
  ): ErrorModel<DTO> {
    return this.buildParameterizedError({
      param: error.param,
      errorCode: error.errorCode,
      errorType: ErrorType.Warning,
    });
  }
  /**
   *
   *
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  static buildError<DTO = any>(
    error: Pick<ErrorModel<DTO>, 'param' | 'errorCode'>,
  ): ErrorModel<DTO> {
    return this.buildParameterizedError({
      param: error.param,
      errorCode: error.errorCode,
      errorType: ErrorType.Error,
    });
  }
  /**
   *
   *
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  static buildValidation<DTO = any>(
    error: Pick<ErrorModel<DTO>, 'param' | 'errorCode'>,
  ): ErrorModel<DTO> {
    return this.buildParameterizedError({
      param: error.param,
      errorCode: error.errorCode,
      errorType: ErrorType.Validation,
    });
  }
  /**
   *
   *
   * @private
   * @static
   * @param {(Pick<ErrorModel, 'param' | 'errorCode' | 'errorType'>)} error
   * @returns {ErrorModel}
   * @memberof ErrorModel
   */
  private static buildParameterizedError<DTO = any>(
    error: Pick<ErrorModel<DTO>, 'param' | 'errorCode' | 'errorType'>,
  ): ErrorModel<DTO> {
    const errorToReturn = new ErrorModel();
    errorToReturn.errorType = error.errorType;
    errorToReturn.errorCode = error.errorCode;
    errorToReturn.param = error.param as string;
    return errorToReturn;
  }
}
