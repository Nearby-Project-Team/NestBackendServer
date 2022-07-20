import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../common/guard/local-auth/local.guard';
import { LoginRequestDto } from '../common/dtos/caregiver/login-request.dto';
import { User } from 'src/common/decorators/login.decorator';
import { LoginSuccessDto } from './dtos/login-success.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() body: LoginRequestDto,
    @User() result: LoginSuccessDto,
    @Res({ passthrough: true }) res: Response
  ) {
    
  }

}
