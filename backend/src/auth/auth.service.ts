import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
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
    // 1. Ищем пользователя
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    // 2. Проверяем существование пользователя
    if (!user) {
      throw new UnauthorizedException(
        'Invalid username or password',
      );
    }

    // 3. Сравниваем пароль с хешем из БД
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid username or password',
      );
    }

    // 4. Формируем payload для токенов
    const payload = {
      sub: user.id,
      username: user.username,
    };

    // 5. Создаём access token
    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: this.configService.getOrThrow<string>(
          'ACCESS_TOKEN_SECRET',
        ),
        expiresIn: '15m',
      },
    );

    // 6. Создаём refresh token
    const refreshToken = await this.jwtService.signAsync(
      payload,
      {
        secret: this.configService.getOrThrow<string>(
          'REFRESH_TOKEN_SECRET',
        ),
        expiresIn: '7d',
      },
    );

    // 7. Сохраняем хеш refresh token в БД
    const refreshTokenHash = await bcrypt.hash(
      refreshToken,
      12,
    );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshTokenHash,
      },
    });

    // 8. Возвращаем результат
    return {
      id: user.id,
      username: user.username,
      accessToken,
      refreshToken,
    };
  }
}