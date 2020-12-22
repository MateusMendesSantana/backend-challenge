import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { MovieListRequest } from './dtos/movie-list-request.dto';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from '../user/jwt.guard';
import { RentService } from './rent.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly service: MovieService,
    private readonly rentService: RentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list(
    @Query()
    query: MovieListRequest
  ) {
    return this.service.list(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':movieId/rents')
  rentMovie(
    @Param('movieId')
    movieId: number
  ) {
    return this.rentService.rentMovie(movieId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':movieId/rents/:rentId')
  returnMovie(
    @Param('movieId')
    movieId: number,
    @Param('rentId')
    rentId: number
  ) {
    return this.rentService.returnMovie(movieId, rentId);
  }
}
