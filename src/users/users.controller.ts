import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser (
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.userService.insertUser(email, password);

    return {id: generatedId};
  }
}
