import { Controller, Post, Body } from '@nestjs/common';
import { LoginRequest } from './dtos/login-request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }
}
