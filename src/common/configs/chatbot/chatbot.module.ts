import { Module } from '@nestjs/common';
import { ChatbotConfigService } from './chatbot.config';

@Module({
    providers: [ ChatbotConfigService ]
})
export class ChatbotConfigModule {}