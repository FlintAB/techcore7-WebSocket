import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { AccessTokenPayload } from '../types/access-token-payload';

interface AuthenticatedRequest extends Request {
  user: AccessTokenPayload;
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Access token is required');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
          secret: this.configService.getOrThrow<string>(
            'ACCESS_TOKEN_SECRET',
          ),
        });

      if (
        typeof payload.sub !== 'string' ||
        typeof payload.username !== 'string'
      ) {
        throw new UnauthorizedException('Invalid access token');
      }

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}