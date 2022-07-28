import { Body, Controller, Post } from '@nestjs/common';
import { ElderlyInfoDto } from './dtos/elderlyInfo.dto';
import { ElderlyService } from './elderly.service';

@Controller('elderly')
export class ElderlyController {
  constructor(private readonly elderlyService: ElderlyService) {}

  @Post('/register')
  async elderlyRegister(
    @Body('name') body: ElderlyInfoDto
  ) {
    
  }

  @Post('/link')
  async linkWithCaregiver(

  ) {

  }

}
