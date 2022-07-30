import { Injectable } from '@nestjs/common';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ChattingRepository } from '../../common/repository/chatting.repository';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from '../../auth/auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
    constructor (
        private readonly cgRepository: CaregiverRepository,
        private readonly elderlyRepository: ElderlyRepository,
        private readonly chatRepository: ChattingRepository,
        private readonly authService: AuthService
    ) {}

    async getUserFromSocket(client: Socket) {
        const cookie = client.handshake.headers.cookie;
        const { accessToken: accessToken } = parse(cookie);
        const _u = this.authService.validateJwtToken(accessToken);
        if (_u === null) {
            throw new WsException('Invalid credentials.');
        }
        return _u;
    }

}
