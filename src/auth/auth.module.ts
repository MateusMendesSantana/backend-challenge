import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../user/jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [UserModule, SharedModule],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'bcrypt',
      useValue: bcrypt
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {}
