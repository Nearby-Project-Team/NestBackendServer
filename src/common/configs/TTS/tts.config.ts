import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TTSConfigService implements HttpModuleOptionsFactory {
    
    constructor (
        private readonly configService: ConfigService
    ) {}

    createHttpOptions(): HttpModuleOptions {
        return {
            timeout: this.configService.get<number>('HTTP_TIMEOUT'),
            maxRedirects: this.configService.get<number>('HTTP_MAX_REDIRECTION'),
            baseURL: this.configService.get<string>('TTS_URL'),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
} 