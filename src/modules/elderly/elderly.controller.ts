import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
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

}
