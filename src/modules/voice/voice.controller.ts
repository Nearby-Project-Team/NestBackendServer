import { Body, Controller, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainVoiceDto, TrainCompleteDto } from './dtos/train-voice.dto';

@Controller('voice')
export class VoiceController {
  constructor(
    private readonly voiceService: VoiceService,
  ) {}

  // 보호자가 음성을 등록함 => 등록 완료되면 O.K 때림.
  @Post('/register/:email/:vname')
  @UseInterceptors(FileInterceptor('audio', {}))
  async registerVoice(
    @Param('email') email: string,
    @Param('vname') vname: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Save file in 'bucket: nearby-<env>-bucket/caregiver_id/voice_name/voice_file_uuid.wav'
    return this.voiceService.registerVoice(email, vname, file.originalname);
  }

  @Patch('/train-voice')
  async trainUserVoice(
    @Body() body: TrainVoiceDto
  ) {
      return await this.voiceService.trainUserVoice(body);
  }

  @Post('/train-complete')
  async trainVoiceComplete(
    @Body() body: TrainCompleteDto
  ) {
    return await this.voiceService.trainVoiceComplete(body);
  }

}
