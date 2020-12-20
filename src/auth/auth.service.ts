import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginRequest } from './dtos/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('bcrypt')
    private readonly bcrypt: any
  ) {}

  async login(body: LoginRequest) {
    const user = await this.userRepository.findOne({
      email: body.email
    });

    if (user == null) {
      throw new BadRequestException('User does not exist');
    }

    const isEqual = this.bcrypt.compareSync(body.password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException(
        'The email address or password is incorrect'
      );
    }

    return {
      token: this.jwtService.sign({ id: user.id })
    };
  }
}
