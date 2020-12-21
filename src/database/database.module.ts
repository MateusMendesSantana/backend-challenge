import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        username: 'root',
        host: configService.get<string>('MYSQL_HOST'),
        database: 'db',
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        port: configService.get<number>('MYSQL_PORT'),
        entities: ['.build/**/*.entity.js'],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule, DatabaseService]
})
export class DatabaseModule {}
