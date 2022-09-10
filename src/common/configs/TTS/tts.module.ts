import { Module } from '@nestjs/common';
import { TTSConfigService } from './tts.config';

@Module({
    providers: [ TTSConfigService ]
})
export class TTSConfigModule {}