import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotConfigService implements HttpModuleOptionsFactory {
    
    constructor (
        private readonly configService: ConfigService
    ) {}

    createHttpOptions(): HttpModuleOptions {
        return {
            timeout: this.configService.get<number>('CHATBOT_TIMEOUT'),
            maxRedirects: this.configService.get<number>('CHATBOT_MAX_REDIRECTION'),
            baseURL: this.configService.get<string>('CHATBOT_URL'),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
} 