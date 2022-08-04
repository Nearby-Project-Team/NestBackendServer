import { AppErrorTypeEnum } from "./AppErrorType.enum";
import { RequestErrorTypeEnum } from "./RequestErrorType.enum";
import { WebSocketErrorTypeEnum } from "./WebSocketErrorType.enum";

export type CustomErrorTypeEnum = WebSocketErrorTypeEnum | 
                                  AppErrorTypeEnum | 
                                  RequestErrorTypeEnum;