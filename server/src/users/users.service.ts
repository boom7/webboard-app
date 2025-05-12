import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  // Register a new user
  async register(username: string, password: string) {
    // Check if the username already exists
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already taken');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return newUser;
  }

  // Login the user
  // async login(username: string, password: string) {
  //   const user = await this.userModel.findOne({ username });

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   // Compare the password with the hashed one
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) {
  //     throw new Error('Invalid credentials');
  //   }

  //   // Create and return a JWT token
  //   const payload = { username: user.username, sub: user._id }; // You can add more info to the payload if needed
  //   const token = this.jwtService.sign(payload); // Sign the payload to generate the JWT

  //   return { token };
  // }

  // Check if a user already exists by username
  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async signInOrCreate(username: string): Promise<string> {
    let user = await this.userModel.findOne({ username });

    // Create the user if not found
    if (!user) {
      user = await this.userModel.create({ username });
    }

    const payload = { sub: user._id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
