import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCreateRequest } from './dtos/user-create-request.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            insert: () => Promise.resolve({ id: 'user-id' }),
            findOne: (body: UserCreateRequest) =>
              body.email === 'existing@exemple.com'
                ? {
                    id: 'id-user'
                  }
                : null
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be success', async () => {
      const email = 'exemple@exemple.com';
      const password = '123';
      const result = await service.create({ email, password });
      expect(result).toBeDefined();
    });
    it('should be user with email address already exists', async () => {
      const email = 'existing@exemple.com';
      const password = '123';
      const promise = service.create({ email, password });
      expect(promise).rejects.toThrowError(BadRequestException);
    });
  });
});
