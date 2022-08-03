import { WebSocketErrorTypeEnum } from "../ErrorType/WebSocketErrorType.enum";
import { IErrorMessage } from "../ErrorMsgInterface/IErrorMessage";
import { HttpStatus } from '@nestjs/common';

export class WebSocketError extends Error {
    public errorCode: WebSocketErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;

    constructor (errorCode: WebSocketErrorTypeEnum) {
        super();
        const errorMessageConfig = this.getError(errorCode);
        if (!errorMessageConfig) throw new Error('Unable to find message code error.');
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.userMessage = errorMessageConfig.userMessage;
    }

    private getError(errorCode: WebSocketErrorTypeEnum): IErrorMessage {
        let res: IErrorMessage;
        switch (errorCode) {
            case WebSocketErrorTypeEnum.INVALID_CREDENTIALS:
                res = {
                    type: WebSocketErrorTypeEnum.INVALID_CREDENTIALS,
                    httpStatus: HttpStatus.FORBIDDEN,
                    errorMessage: 'Invalid credentials for WS App!',
                    userMessage: 'Cannot Validate Ws User!'
                };
                break;
            case WebSocketErrorTypeEnum.INVALID_USER:
                res = {
                    type: WebSocketErrorTypeEnum.INVALID_USER,
                    httpStatus: HttpStatus.FORBIDDEN,
                    errorMessage: 'Invalid User Request!',
                    userMessage: 'Invalid User Access!'
                };
                break;
            case WebSocketErrorTypeEnum.NO_VALID_USER:
                res = {
                    type: WebSocketErrorTypeEnum.NO_VALID_USER,
                    httpStatus: HttpStatus.FORBIDDEN,
                    errorMessage: 'No User Found',
                    userMessage: 'No Valid User Found.'
                };
                break;
            case WebSocketErrorTypeEnum.INVALID_ACCESS:
                res = {
                    type: WebSocketErrorTypeEnum.INVALID_ACCESS,
                    httpStatus: HttpStatus.BAD_REQUEST,
                    errorMessage: "",
                    userMessage: ""
                };
                break;
        }
        return res;
    }

}