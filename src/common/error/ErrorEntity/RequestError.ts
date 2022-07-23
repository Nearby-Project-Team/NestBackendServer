import { RequestErrorTypeEnum } from "../ErrorType/RequestErrorType.enum";
import { IErrorMessage } from "../ErrorMsgInterface/IErrorMessage";
import { HttpStatus } from '@nestjs/common';

export class RequestError extends Error {
    public errorCode: RequestErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;

    constructor (errorCode: RequestErrorTypeEnum) {
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

    getError(errorCode: RequestErrorTypeEnum): IErrorMessage {
        let res: IErrorMessage;
        switch(errorCode) {
            case RequestErrorTypeEnum.INVALID_PASSWORD:
                res = {
                    type: RequestErrorTypeEnum.INVALID_PASSWORD,
                    httpStatus: HttpStatus.FORBIDDEN,
                    errorMessage: 'Invalid User Password',
                    userMessage: 'Provided User Passowrd is not match with Original Password!'
                };
                break;
            case RequestErrorTypeEnum.USER_NOT_FOUND:
                res = {
                    type: RequestErrorTypeEnum.USER_NOT_FOUND,
                    httpStatus: HttpStatus.BAD_REQUEST,
                    errorMessage: 'Invalid User Password',
                    userMessage: 'Provided User Passowrd is not match with Original Password!'
                };
                break;
            case RequestErrorTypeEnum.INVALID_USER:
                res = {
                    type: RequestErrorTypeEnum.INVALID_USER,
                    httpStatus: HttpStatus.BAD_REQUEST,
                    errorMessage: 'Invalid User!',
                    userMessage: 'Invalid User for this Request'
                };
                break;
        }
        return res;
    }

}