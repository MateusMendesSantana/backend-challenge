import { UsersController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN'),
        signOptions: { expiresIn: '1h' }
      })
    }),
    PassportModule
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService, PassportModule, JwtModule]
})
export class UserModule {}
