import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guard/jwt-auth/jwt.guard';
import { ElderlyInfoDto } from './dtos/elderlyInfo.dto';
import { ElderlySearchDto } from './dtos/elderlySearch.dto';
import { LinkCaregiverDto } from './dtos/linkCaregiver.dto';
import { ElderlyService } from './elderly.service';

@Controller('elderly')
export class ElderlyController {
  constructor(private readonly elderlyService: ElderlyService) {}

  // @UseGuards(JwtGuard) // Caregiver가 요청
  @Post('/register')
  async elderlyRegister(
    @Body() body: ElderlyInfoDto
  ) {
    return this.elderlyService.registerElderly(body);
  }

  // @UseGuards(JwtGuard)
  @Post('/link')
  async linkWithCaregiver(
    @Body() info: LinkCaregiverDto
  ) {
    return this.elderlyService.linkWithCaregiver(info);
  }

  @Post('/login')
  async elderlyLogin(
    @Body('uuid') elderly_id: string,
    @Body('name') elderly_name: string,
  ) {
    return this.elderlyService.loginElderly(elderly_id, elderly_name);
  }

  @Post('/verify/:email/:token')
  async verifyElderly(
    @Param('token') token: string,
    @Param('email') email: string,
    @Body() info: ElderlySearchDto
  ) {
    return await this.elderlyService.verifyElderly(token, email, info);
  }

  @Get('/list/:cg_email')
  async getElderlyList(
    @Param('cg_email') cg_email: string
  ) {
    return await this.elderlyService.getElderlyList(cg_email);
  }

  @Get('/calendar')
  async getElderlyCalendar(
    @Query('elderly_id') elderly_id: string,
    @Query('page') page: number
  ) {
    return await this.elderlyService.getElderlyCalendar(elderly_id, page);
  }

  @Get('/calender/all')
  async getElderlyCalendarAll(
    @Query('elderly_id') elderly_id: string
  ) {
    return await this.elderlyService.getElderlyCalendarAll(elderly_id);
  }

  @Get('/chat')
  async getElderlyChatting(
    @Query('elderly_id') elderly_id: string,
    @Query('page') page: number
  ) {
    return await this.elderlyService.getElderlyChatting(elderly_id, page);
  }

}
