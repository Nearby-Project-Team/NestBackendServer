import { Module } from '@nestjs/common';
import { CalandarModule } from './calandar/calandar.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
      ChatModule,
      CalandarModule
  ]
})
export class ApplicationModule {}