/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express'; // Import the default Request type from express

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    console.log('UsersController initialized');
  }

  // Register a new user with username and password
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      const newUser = await this.usersService.register(username, password);

      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Login the user by username and password
  // @Post('login')
  // async login(
  //   @Body('username') username: string,
  //   @Body('password') password: string,
  // ) {
  //   try {
  //     // Authenticate the user
  //     const token = await this.usersService.login(username, password);

  //     return token;
  //   } catch (error) {
  //     // Handle error
  //     throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
  //   }
  // }

  @Post('signin')
  async signIn(@Body('username') username: string) {
    try {
      const token = await this.usersService.signInOrCreate(username);
      return { token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
