import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('Connection')
    public readonly connection: Connection
  ) {}

  async getRepository<T>(entity): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }
}
