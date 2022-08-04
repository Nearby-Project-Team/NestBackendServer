import { HttpStatus } from '@nestjs/common';
import { CustomErrorTypeEnum } from '../ErrorType/ErrorType.enum';
import { WebSocketErrorTypeEnum } from '../ErrorType/WebSocketErrorType.enum';

export interface IErrorMessage {
    type: CustomErrorTypeEnum;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
}