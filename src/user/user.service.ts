import { Injectable, BadRequestException } from '@nestjs/common';
import { UserCreateRequest } from './dtos/user-create-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(body: UserCreateRequest) {
    const user = await this.userRepository.findOne({ email: body.email });

    if (user) {
      throw new BadRequestException('User with email address already exists');
    }

    return this.userRepository.insert({
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    });
  }
}
