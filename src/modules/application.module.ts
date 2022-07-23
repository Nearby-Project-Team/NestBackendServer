import { Module } from '@nestjs/common';
import { CalandarModule } from './calandar/calandar.module';
import { ChatModule } from './chat/chat.module';
import { VoiceModule } from './voice/voice.module';


@Module({
  imports: [
      ChatModule,
      CalandarModule,
      VoiceModule
  ]
})
export class ApplicationModule {}