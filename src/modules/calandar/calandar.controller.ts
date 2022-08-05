import { Body, Controller, Post } from '@nestjs/common';
import { CalandarService } from './calandar.service';
import { OneOFFScheduleDto } from './dto/ooschedule.dto';
import { RepeatScheduleDto } from './dto/reschedule.dto';

@Controller('calandar')
export class CalandarController {
  constructor(private readonly calandarService: CalandarService) {}

  @Post('/schedule/oneoff')
  async setOneOffSchedule(
    @Body() schedule_info: OneOFFScheduleDto
  ) {
    return this.calandarService.setOneOffScheduleElderly(schedule_info);
  }

  @Post('/schedule/repeat')
  async setRepeatSchedule(
    @Body() schedule_info: RepeatScheduleDto
  ) {
    return this.calandarService.setRepeatScheduleElderly(schedule_info);
  }

}
