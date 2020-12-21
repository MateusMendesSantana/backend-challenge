import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieStatus } from './enums/movie-status';
import { Movie } from './movie.entity';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: query => {
              const { status } = query || {};
              return [
                {
                  id: 1,
                  status: MovieStatus.AVAILABLE
                },
                {
                  id: 2,
                  status: MovieStatus.RENTED
                },
                {
                  id: 3,
                  status: MovieStatus.AVAILABLE
                },
                {
                  id: 4,
                  status: MovieStatus.AVAILABLE
                }
              ].filter(it => status == null || it.status === status);
            }
          }
        }
      ]
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should be success without query', async () => {
      const results = await service.list();
      expect(results).toBeDefined();
      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBe(4);
    });
    it('should be success with query', async () => {
      const results = await service.list({ status: MovieStatus.RENTED });
      expect(results).toBeDefined();
      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBe(1);
    });
  });
});
