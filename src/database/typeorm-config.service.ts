import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: 'root',
      host: this.configService.get<string>('MYSQL_HOST'),
      database: 'db',
      password: this.configService.get<string>('MYSQL_ROOT_PASSWORD'),
      port: this.configService.get<number>('MYSQL_PORT'),
      entities: ['.build/**/*.entity.js'],
      synchronize: true
    };
  }
}
