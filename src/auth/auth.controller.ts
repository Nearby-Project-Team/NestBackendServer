import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../common/guard/local-auth/local.guard';
import { LoginRequestDto } from '../common/dtos/caregiver/login-request.dto';
import { User } from 'src/common/decorators/login.decorator';
import { LoginSuccessDto } from './dtos/login-success.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(
    @Body() body: LoginRequestDto,
    @User() result: LoginSuccessDto,
    @Res({ passthrough: true }) res
  ) {
    const u = await this.authService.login(body);
    res.cookie('accessToken', u.accessToken);
    // Add Refresh Token later
    return result;
  }

  @Post('/register')
  async register(
    @Body() register: RegisterDto
  ) {
    return await this.authService.register(register);
  }

  @Post('/verify/:email/:token')
  async verify(
    @Param('email') email: string,
    @Param('token') token: string
  ) {
    return await this.authService.verify(email, token);
  }

  @Post('/agreement')
  async agreement(
    @Body('email') email: string  
  ) {
    return await this.authService.agreement(email);
  }
}
