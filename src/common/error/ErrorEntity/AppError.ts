import { AppErrorTypeEnum }  from '../ErrorType/AppErrorType.enum';
import { IErrorMessage } from '../ErrorMsgInterface/IErrorMessage';
import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {

    public errorCode: AppErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;

    constructor (errorCode: AppErrorTypeEnum) {
        super();
        const errorMessageConfig: IErrorMessage = this.getError(errorCode);
        if (!errorMessageConfig) throw new Error('Unable to find message code error.');
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.userMessage = errorMessageConfig.userMessage;
    }

    private getError(errorCode: AppErrorTypeEnum): IErrorMessage {
        let res: IErrorMessage;
        switch (errorCode) {
            case AppErrorTypeEnum.USER_EXISTS:
                res = {
                    type: AppErrorTypeEnum.USER_EXISTS,
                    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                    errorMessage: 'User exisists',
                    userMessage: 'Username exists'
                };
                break;
            case AppErrorTypeEnum.NOT_IN_SESSION:
                res = {
                    type: AppErrorTypeEnum.NOT_IN_SESSION,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'No Session',
                    userMessage: 'Session Expired'
                };
                break;
            case AppErrorTypeEnum.NO_USERS_IN_DB:
                res = {
                    type: AppErrorTypeEnum.NO_USERS_IN_DB,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'No Users exits in the database',
                    userMessage: 'No Users. Create some.'
                };
                break;
            case AppErrorTypeEnum.INVALID_DATATYPES:
                res = {
                    type: AppErrorTypeEnum.INVALID_DATATYPES,
                    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
                    errorMessage: 'Invalid DataTypes!',
                    userMessage: 'Invalid Datatypes has detected!'
                }
                break;
            case AppErrorTypeEnum.USER_NOT_VERIFIED:
                res = {
                    type: AppErrorTypeEnum.USER_NOT_VERIFIED,
                    httpStatus: HttpStatus.BAD_REQUEST,
                    errorMessage: 'User not verified yet',
                    userMessage: 'User not verified yet'
                };
                break;
            case AppErrorTypeEnum.INVALID_VERIFICATION:
                res = {
                    type: AppErrorTypeEnum.INVALID_VERIFICATION,
                    httpStatus: HttpStatus.FORBIDDEN,
                    errorMessage: 'Invalid verification token!',
                    userMessage: 'Cannot verify the user! check the verification info!'
                };
                break;
        }
        return res;
    }

}