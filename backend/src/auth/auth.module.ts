import { Module } from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [ UsersModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'changeme',
    signOptions: { expiresIn: '1hr' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
