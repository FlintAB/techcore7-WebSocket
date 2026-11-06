
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  createHash,
  randomUUID,
  timingSafeEqual,
} from 'node:crypto';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid username or password',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid username or password',
      );
    }

    return this.generateTokens(user.id, user.username);
  }

  async refresh(refreshToken: string) {
    let payload: { sub: string };

    try {
      payload = await this.jwtService.verifyAsync<{
        sub: string;
      }>(refreshToken, {
        secret: this.configService.getOrThrow<string>(
          'REFRESH_TOKEN_SECRET',
        ),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (typeof payload.sub !== 'string') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const incomingHash = this.hashToken(refreshToken);

    const storedHashBuffer = Buffer.from(
      user.refreshTokenHash,
      'hex',
    );

    const incomingHashBuffer = Buffer.from(
      incomingHash,
      'hex',
    );

    const isTokenValid =
      storedHashBuffer.length === incomingHashBuffer.length &&
      timingSafeEqual(storedHashBuffer, incomingHashBuffer);

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user.id, user.username);
  }

  private async generateTokens(userId: string, username: string) {
    const payload = {
      sub: userId,
      username,
    };

    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: this.configService.getOrThrow<string>(
          'ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '15m',
      },
    );

    const jti = randomUUID();

    const refreshToken = await this.jwtService.signAsync(
      {
        ...payload,
        jti,
      },
      {
        secret: this.configService.getOrThrow<string>(
          'REFRESH_TOKEN_SECRET',
        ),
        expiresIn: '7d',
      },
    );

    const refreshTokenHash = this.hashToken(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash,
      },
    });

    return {
      id: userId,
      username,
      accessToken,
      refreshToken,
    };
  }

  private hashToken(token: string): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }
}
