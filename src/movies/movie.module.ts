import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { RentService } from './rent.service';
import { Module } from '@nestjs/common';
import { Movie } from './movie.entity';
import { Rent } from './rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Rent])],
  controllers: [MovieController],
  providers: [MovieService, RentService]
})
export class MovieModule {}
