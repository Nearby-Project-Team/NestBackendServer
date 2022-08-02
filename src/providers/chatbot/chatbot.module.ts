import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ChatbotConfigModule } from '../../common/configs/chatbot/chatbot.module';
import { ChatbotConfigService } from '../../common/configs/chatbot/chatbot.config';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ ChatbotConfigModule ],
            useClass: ChatbotConfigService,
            inject: [ ChatbotConfigService ]
        })
    ]
})
export class ChatbotModule {}