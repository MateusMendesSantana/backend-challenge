import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MovieListRequest } from './dtos/movie-list-request.dto';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from '../user/jwt.guard';
import { Movie } from './movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list(
    @Query()
    query: MovieListRequest
  ): Promise<Movie[]> {
    return this.service.list(query);
  }
}
