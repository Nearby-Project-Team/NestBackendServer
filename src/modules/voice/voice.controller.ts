import { Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceMetadataDto } from './dtos/vmetadata.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('voice')
export class VoiceController {
  constructor(
    private readonly voiceService: VoiceService,
  ) {}

  // 보호자가 음성을 등록함 => 등록 완료되면 O.K 때림.
  @Post('register')
  @UseInterceptors(FileInterceptor('audio'))
  async registerVoice(
    @Body() body: VoiceMetadataDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Save file in 'bucket: nearby-<env>-bucket/caregiver_id/voice_name/voice_file_uuid.wav'
    return this.voiceService.registerVoice(body, file.mimetype);
  }

}
