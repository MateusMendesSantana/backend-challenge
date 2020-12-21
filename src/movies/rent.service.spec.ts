import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieStatus } from './enums/movie-status';
import { RentService } from './rent.service';
import { Movie } from './movie.entity';
import { Rent } from './rent.entity';

describe('RentService', () => {
  let service: RentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        {
          provide: getRepositoryToken(Rent),
          useValue: {
            insert: async () => ({}),
            update: async () => ({ affected: 1 })
          }
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            update: async () => ({}),
            findOne: async movieId => ({
              status: movieId === 1 ? MovieStatus.AVAILABLE : MovieStatus.RENTED
            })
          }
        },
        {
          provide: getConnectionToken(),
          useValue: {
            transaction: promise => promise()
          }
        }
      ]
    }).compile();

    service = module.get<RentService>(RentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('rentMovie', () => {
    it('should be success', async () => {
      const result = await service.rentMovie(1);
      expect(result).toBeDefined();
    });
    it('should be fail', async () => {
      const promise = service.rentMovie(2);
      expect(promise).rejects.toThrowError(BadRequestException);
    });
  });

  describe('returnMovie', () => {
    it('should be success', async () => {
      const result = await service.returnMovie(2, 1);
      expect(result).toBeDefined();
      expect(result.affected).toBe(1);
    });
    it('should be fail', async () => {
      const promise = service.returnMovie(1, 1);
      expect(promise).rejects.toThrowError(BadRequestException);
    });
  });
});
