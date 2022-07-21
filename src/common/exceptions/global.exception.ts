import { 
    ArgumentsHost, 
    Catch, 
    ExceptionFilter, 
    HttpStatus, 
    UnauthorizedException 
} from '@nestjs/common';
import { AppError } from "../error/ErrorEntity/AppError";
import { RequestError } from "../error/ErrorEntity/RequestError";
import HostId from "hostid";

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
        } else if (exception.status === 400) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                msg: "Bad Request from Client. It's highly recommended to check your parameters one more time."
            });
        } else {
            console.error(exception.message);
            console.error(exception.stack);
            const nowTime = new Date();
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                msg: `Error on ${HostId()} in time ${nowTime.toISOString()}`
            });
        }

    }
}