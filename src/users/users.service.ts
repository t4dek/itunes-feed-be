import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './users.model';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async insertUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = new this.userModel({email, password: hashedPassword});
      const result = await newUser.save();

      return result.id as string;
    } catch (error) {
      const errors = Object.keys(error?.errors) || [];

      const message = errors.map(e => error?.errors[e]?.properties?.message).toString();
      if (error.errors?.email) {
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Could not find user');
    }

    return user;
  }
}