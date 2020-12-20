import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoginRequest } from './dtos/login-request.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: async (body: LoginRequest) => {
              return body.email === 'exemple@exemple.com'
                ? {
                    id: 'user-id',
                    password: '123'
                  }
                : null;
            }
          }
        },
        {
          provide: 'bcrypt',
          useValue: {
            compareSync: (a: string, b: string) => a === b
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should be sucess', async () => {
      const email = 'exemple@exemple.com';
      const password = '123';
      const result = await service.login({
        email,
        password
      });
      expect(result).toBeDefined();
      expect(result).toHaveProperty('token');
    });
    it('should be incorrect pass', async () => {
      const email = 'exemple@exemple.com';
      const password = '1234';
      await expect(
        service.login({
          email,
          password
        })
      ).rejects.toThrow('The email address or password is incorrect');
    });
    it('should be error', async () => {
      const email = 'existing@exemple.com';
      const password = '123';
      await expect(
        service.login({
          email,
          password
        })
      ).rejects.toThrow('User does not exist');
    });
  });
});
