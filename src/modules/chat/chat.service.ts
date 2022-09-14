import { Injectable, Logger } from '@nestjs/common';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { ChattingRepository } from '../../common/repository/chatting.repository';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ChatbotResponseDto } from './dtos/chatbotRes.dto';
import { UserTypeEnum } from 'src/common/types/user.type';
import { WebSocketErrorTypeEnum } from 'src/common/error/ErrorType/WebSocketErrorType.enum';
import { ElderlyEntity } from '../../common/entity/elderly.entity';
import { CaregiverEntity } from '../../common/entity/caregiver.entity';
import { ConfigService } from '@nestjs/config';
import { InferenceVoiceDto } from './dtos/inference.dto';
import { VoiceModelRepository } from '../../common/repository/voiceModel.repository';
import { VoiceTypeEnum } from 'src/common/types/voice.type';

@Injectable()
export class ChatService {
    constructor (
        private readonly cgRepository: CaregiverRepository,
        private readonly elderlyRepository: ElderlyRepository,
        private readonly chatRepository: ChattingRepository,
        private readonly vmRepository: VoiceModelRepository,
        // private readonly authService: AuthService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly logger: Logger
    ) {}

    async getUserFromSocket(client: Socket): Promise<ElderlyEntity | CaregiverEntity> {
        const cookie = client.handshake?.headers?.cookie;
        const {  
            user_type,
            user_info
        } = parse(cookie);
        let _u;
        this.logger.debug(`${user_type} ${user_info}`);
        if (user_type === UserTypeEnum.CAREGIVER) {
            _u = this.cgRepository.findUserByEmail(user_info);
        } else if (user_type === UserTypeEnum.ELDERLY) {
            _u = this.elderlyRepository.findElderlyById(user_info);
        } else {
            throw new WsException(WebSocketErrorTypeEnum.INVALID_USER);
        }
        // Access Token Authentication
        // const { accessToken: accessToken } = parse(cookie);
        // const _u = this.authService.validateJwtToken(accessToken);
        // End.
        if (_u === null) {
            throw new WsException(WebSocketErrorTypeEnum.INVALID_CREDENTIALS);
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
        const chatList = await this.chatRepository.getChattingHistory(elderly_id, page);
        return chatList;
    }

    async getChatbotResponse(contents: string, elderly_id: string): Promise<AxiosResponse<ChatbotResponseDto>> {
        const _url = this.configService.get<string>('CHATBOT_URL');
        return this.httpService.axiosRef.post(`${_url}/chat`, {
            msg: contents,
            elderly_id: elderly_id
        });
    }

    async getTTSInferenceResult(caregiver_id: string, msg: string) {
        const _url = this.configService.get<string>('TTS_URL');
        const _u = await this.cgRepository.findUserByEmail(caregiver_id);
        this.logger.debug(caregiver_id);
        const _vm = await this.vmRepository.findVoiceModelByCaregiverId(_u.uuid);
        this.logger.debug(_vm.status);
        if (_vm.status === VoiceTypeEnum.NOT_TRAINED) return false;
        const _data: InferenceVoiceDto = {
            caregiver_id: caregiver_id,
            voice_target: _vm.name,
            msg: msg
        };
        // this.logger.debug(`${_url}/tts/inference`);
        this.logger.debug(JSON.stringify(_data));
        const _res = await this.httpService.axiosRef.post(`${_url}/tts/inference`, _data, {
            responseType: 'blob'
        });
        return _res;
    }

}
