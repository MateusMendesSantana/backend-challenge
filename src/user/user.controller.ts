import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequest } from './dtos/user-create-request.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    body: UserCreateRequest
  ) {
    return this.userService.create(body);
  }
}
