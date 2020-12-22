import { ConfigModule, ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory
} from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import * as request from 'supertest';

class MockTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: 'root',
      host: this.configService.get<string>('MYSQL_HOST'),
      database: 'db',
      password: this.configService.get<string>('MYSQL_ROOT_PASSWORD'),
      port: this.configService.get<number>('MYSQL_PORT'),
      entities: [join(__dirname, '../src/**/*.entity.{ts,js}')],
      dropSchema: true,
      synchronize: true
    };
  }
}

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async done => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useClass: MockTypeOrmConfigService
        })
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    done();
  }, 110000000);

  afterAll(async done => {
    await app.close();
    done();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'exemple@exemple.com', password: '123' })
      .expect(200);
  });
});
