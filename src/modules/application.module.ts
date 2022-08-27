import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { ChatModule } from './chat/chat.module';
import { VoiceModule } from './voice/voice.module';
import { ElderlyModule } from './elderly/elderly.module';

@Module({
  imports: [
      ChatModule,
      CalendarModule,
      VoiceModule,
      ElderlyModule
  ]
})
export class ApplicationModule {}