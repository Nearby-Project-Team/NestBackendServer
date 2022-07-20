import { 
    ArgumentsHost, 
    Catch, 
    ExceptionFilter, 
    HttpStatus, 
    UnauthorizedException 
} from '@nestjs/common';
import { AppError } from "../error/ErrorEntity/AppError";
import { RequestError } from "../error/ErrorEntity/RequestError";

@Catch()
export class GlobalErrorDispatcher implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        if (exception instanceof AppError || exception instanceof RequestError) {
            return res.status(exception.httpStatus).json({
                errorCode: exception.errorCode,
                errorMsg: exception.errorMessage,
                usrMsg: exception.userMessage,
                httpCode: exception.httpStatus
            });
        } else if (exception instanceof UnauthorizedException) {
            console.log(exception.message);
            console.error(exception.stack);
            return res.status(HttpStatus.UNAUTHORIZED).json(exception.message);
        } else if (exception.status === 403) {
            return res.status(HttpStatus.FORBIDDEN).json(exception.message);
        } else {
            console.error(exception.message);
            console.error(exception.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }

    }
}