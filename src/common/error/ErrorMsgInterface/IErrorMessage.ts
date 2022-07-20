import { HttpStatus } from '@nestjs/common';
import { CustomErrorTypeEnum } from '../ErrorType/ErrorType.enum';

export interface IErrorMessage {
    type: CustomErrorTypeEnum;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
}