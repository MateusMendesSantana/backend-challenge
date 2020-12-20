import { SharedModule } from './shared/shared.module';
import { MovieModule } from './movies/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule, UserModule, MovieModule, AuthModule]
})
export class AppModule {}
