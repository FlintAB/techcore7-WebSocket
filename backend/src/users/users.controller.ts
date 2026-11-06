import {
   Controller,
   Get,
   Req,
   UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { AccessTokenPayload } from '../auth/types/access-token-payload';

interface AuthenticatedRequest extends Request {
   user: AccessTokenPayload;
}

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Get('me')
   @UseGuards(AccessTokenGuard)
   getProfile(@Req() request: AuthenticatedRequest) {
      return this.usersService.getProfile(request.user.sub);
   }
}