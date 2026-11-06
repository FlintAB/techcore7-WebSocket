import {
   Body,
   Controller,
   Get,
   HttpCode,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AccessTokenPayload } from './types/access-token-payload';

interface AuthenticatedRequest extends Request {
   user: AccessTokenPayload;
}

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   @HttpCode(200)
   login(@Body() dto: LoginDto) {
      return this.authService.login(dto);
   }

   @Post('refresh')
   @HttpCode(200)
   refresh(@Body() dto: RefreshTokenDto) {
      return this.authService.refresh(dto.refreshToken);
   }

   @Get('profile')
   @UseGuards(AccessTokenGuard)
   getProfile(@Req() request: AuthenticatedRequest) {
      return {
         id: request.user.sub,
         username: request.user.username,
      };
   }

   @Post('logout')
   @HttpCode(200)
   @UseGuards(AccessTokenGuard)
   logout(@Req() request: AuthenticatedRequest) {
      return this.authService.logout(request.user.sub);
   }
}