import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard/jwt-auth/jwt.guard';
import { CalendarService } from './calendar.service';
import { OneOFFScheduleDto } from './dto/ooschedule.dto';
import { RepeatScheduleDto } from './dto/reschedule.dto';

@Controller('calandar')
export class CalendarController {
  constructor(private readonly CalendarService: CalendarService) {}

  @UseGuards(JwtGuard)
  @Post('/schedule/oneoff')
  async setOneOffSchedule(
    @Body() schedule_info: OneOFFScheduleDto
  ) {
    return this.CalendarService.setOneOffScheduleElderly(schedule_info);
  }

  @UseGuards(JwtGuard)
  @Post('/schedule/repeat')
  async setRepeatSchedule(
    @Body() schedule_info: RepeatScheduleDto
  ) {
    return this.CalendarService.setRepeatScheduleElderly(schedule_info);
  }

}
