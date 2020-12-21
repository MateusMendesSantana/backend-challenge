import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseService } from '../src/database/database.service';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { TestUtils } from './test-utils';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { SharedModule } from '../src/shared/shared.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, UserModule],
      controllers: [UserController],
      providers: [UserService, TestUtils, DatabaseService]
    }).compile();

    app = moduleFixture.createNestApplication();
    testUtils = moduleFixture.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await app.init();
  });

  afterEach(async () => {
    await testUtils.closeDbConnection();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'exemple@exemple.com', password: '123' })
      .expect(200);
  });
});
