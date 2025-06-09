import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Student login
  @Post('log-in-user')
  @HttpCode(200)
  async loginStudent(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInUser(loginDto, res);
  }

  // Admin login
  @Post('log_in_admin')
  @HttpCode(200)
  async loginAdmin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(loginDto, res);
  }

  // Student logout
  @Post('sign_out_user')
  async signOutStudent(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logOutUser(req, res);
  }

  // Admin logout
  @Post('sign-out-admin')
  async signOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logOutAdmin(req, res);
  }

  // Student refresh
  @Get('refresh-token-user')
  async refreshStudent(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokenUser(req, res);
  }

  // Admin refresh
  @Get('refresh-token-admin')
  async refreshAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokenAdmin(req, res);
  }
}
