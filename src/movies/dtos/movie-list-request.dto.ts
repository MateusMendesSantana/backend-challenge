import { IsEnum, IsOptional } from 'class-validator';
import { MovieStatus } from '../enums/movie-status';

export class MovieListRequest {
  @IsOptional()
  @IsEnum(MovieStatus)
  status: MovieStatus;
}
