import { AppErrorTypeEnum } from "./AppErrorType.enum";
import { RequestErrorTypeEnum } from "./RequestErrorType.enum";

export type CustomErrorTypeEnum = AppErrorTypeEnum | 
                                  RequestErrorTypeEnum;