import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { RentStatus } from './enums/rent-status.enum';
import { Rent } from './rent.entity';
import { Movie } from './movie.entity';
import { MovieStatus } from './enums/movie-status';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly repository: Repository<Rent>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectConnection()
    private readonly connection: Connection
  ) {}

  async rentMovie(movieId: number) {
    return this.connection.transaction(async () => {
      const movie = await this.movieRepository.findOne(movieId);

      if (movie.status !== MovieStatus.AVAILABLE) {
        throw new BadRequestException('Movie is unavailable');
      }

      await this.movieRepository.update(movieId, {
        status: MovieStatus.RENTED
      });
      return this.repository.insert({ movieId });
    });
  }

  async returnMovie(movieId: number, rentId: number) {
    return this.connection.transaction(async () => {
      const movie = await this.movieRepository.findOne(movieId);

      if (movie.status !== MovieStatus.RENTED) {
        throw new BadRequestException('the movie is not rented');
      }

      await this.movieRepository.update(movieId, {
        status: MovieStatus.AVAILABLE
      });
      return this.repository.update(
        { movieId, id: rentId },
        { status: RentStatus.RETURNED }
      );
    });
  }
}
