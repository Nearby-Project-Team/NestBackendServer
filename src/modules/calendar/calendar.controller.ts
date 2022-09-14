import { Body, Controller, Post } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { OneOFFScheduleDto } from './dto/ooschedule.dto';
import { RepeatScheduleDto } from './dto/reschedule.dto';

@Controller('calandar')
export class CalendarController {
  constructor(private readonly CalendarService: CalendarService) {}

  @Post('/schedule/oneoff')
  async setOneOffSchedule(
    @Body() schedule_info: OneOFFScheduleDto
  ) {
    return this.CalendarService.setOneOffScheduleElderly(schedule_info);
  }

  @Post('/schedule/repeat')
  async setRepeatSchedule(
    @Body() schedule_info: RepeatScheduleDto
  ) {
    return this.CalendarService.setRepeatScheduleElderly(schedule_info);
  }

}
