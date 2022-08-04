import { Injectable, Logger } from '@nestjs/common';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ChattingRepository } from '../../common/repository/chatting.repository';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from '../../auth/auth.service';
import { WsException } from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ChatbotResponseDto } from './dtos/chatbotRes.dto';
import { UserTypeEnum } from 'src/common/types/user.type';
import { WebSocketError } from '../../common/error/ErrorEntity/WebSocketError';
import { WebSocketErrorTypeEnum } from 'src/common/error/ErrorType/WebSocketErrorType.enum';
import { ElderlyEntity } from '../../common/entity/elderly.entity';
import { CaregiverEntity } from '../../common/entity/caregiver.entity';

@Injectable()
export class ChatService {
    constructor (
        private readonly cgRepository: CaregiverRepository,
        private readonly elderlyRepository: ElderlyRepository,
        private readonly chatRepository: ChattingRepository,
        private readonly authService: AuthService,
        private readonly httpService: HttpService,
        private readonly logger: Logger
    ) {}

    async getUserFromSocket(client: Socket): Promise<ElderlyEntity | CaregiverEntity> {
        const cookie = client.handshake.headers.cookie;
        const {  
            user_type,
            user_info
        } = parse(cookie);
        let _u;
        this.logger.debug(`${user_type} ${user_info} has entered to the server!`);
        if (user_type === UserTypeEnum.CAREGIVER) {
            _u = this.cgRepository.findUserByEmail(user_info);
        } else if (user_type === UserTypeEnum.ELDERLY) {
            _u = this.elderlyRepository.findElderlyById(user_info);
        } else {
            throw new WebSocketError(WebSocketErrorTypeEnum.INVALID_USER);
        }
        // Access Token Authentication
        // const { accessToken: accessToken } = parse(cookie);
        // const _u = this.authService.validateJwtToken(accessToken);
        // End.
        if (_u === null) {
            throw new WebSocketError(WebSocketErrorTypeEnum.INVALID_CREDENTIALS);
        }
        return _u;
    }

    async saveChatting(
        content: string, 
        elderly_id: string,
        isChatbot: boolean
    ) {
        await this.chatRepository.saveChatting(
            elderly_id,
            content,
            new Date(),
            isChatbot
        );
    }

    async getChatting(elderly_id: string, page: number) {
        const chatList = await this.chatRepository.getChattingHistory(
            elderly_id,
            page
        );
        return chatList;
    }

    async getChatbotResponse(contents: string): Promise<AxiosResponse<ChatbotResponseDto>> {
        return this.httpService.axiosRef.post('/chat', {
            msg: contents
        });
    }

}
