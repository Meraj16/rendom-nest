// src/auth/auth.controller.ts
import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { LoginDto, RefreshDto } from './dto/auth.dto';
import { ResponseHandler } from 'src/common/response.handler';
import { ExtendedRequest } from './interfaces/extended-request.interface';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const tokens = await this.authService.login(req.user);
      return ResponseHandler.success(res, tokens, 'LOGIN_SUCCESS');
    } catch (error) {
      return ResponseHandler.internalServerError(res, 'INTERNAL_SERVER_ERROR');
    }
  }

  @Post('register')
  async register(@Body() userDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(userDto);
      return ResponseHandler.created(res, user, 'USER_REGISTERED');
    } catch (error) {
      return ResponseHandler.internalServerError(res, 'INTERNAL_SERVER_ERROR');
    }
  }

  @Post('refresh')
  async refresh(@Req() req: ExtendedRequest, @Body() refreshDto: RefreshDto, @Res() res: Response) {
    try {
      const { refresh_token } = refreshDto;
      const userId = req.user._id;

      const tokens = await this.authService.refreshTokens(userId, refresh_token);
      return ResponseHandler.success(res, tokens, 'TOKEN_REFRESHED');
    } catch (error) {
      return ResponseHandler.unauthorized(res, 'TOKEN_REFRESH_FAILED');
    }
  }
}