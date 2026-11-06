import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  imports: [
      JwtModule.register({}),
  ],
  exports: [
      AccessTokenGuard,
      JwtModule,
  ],
  controllers: [AuthController],
  providers: [
      AuthService,
      AccessTokenGuard,
  ],
})
export class AuthModule {}