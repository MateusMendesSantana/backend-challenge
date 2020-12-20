import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { MovieModule } from './movies/movie.module';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule, UserModule, MovieModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
