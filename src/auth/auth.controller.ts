import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("log-in-user")
  @HttpCode(200)
  async login(
    @Body() LoginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginUser(LoginDto, res);
  }
  @Post("sign-out-user")
  async signOutTeacher(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logOutUser(req, res);
  }
  @Get("refresh-token-teacher")
  async getRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(req, res);
  }
}
