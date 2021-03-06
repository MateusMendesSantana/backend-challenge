import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  exports: [DatabaseModule, ConfigModule]
})
export class SharedModule {}
