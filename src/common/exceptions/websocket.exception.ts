import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

@Catch(WsException)
export class WebSocketExceptionDispatcher extends BaseWsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost): void {
        const client = host.switchToWs().getClient() as WebSocket;
        const data = host.switchToWs().getData();
        const error = exception.getError();
        const details = error instanceof Object ? { ...error } : { message: error };
        client.send(JSON.stringify({
            event: "error",
            data: {
                id: (client as any).id,
                rid: data.rid,
                ...details
            }
        }));
    }
}