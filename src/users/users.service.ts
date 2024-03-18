import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument,UserSchema, User } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const saltOrRounds = 10;
    const createdUser = new this.UserModel(createUserDto);
    createdUser.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createdUser.id = uuidv4()
    createdUser.wallet = uuidv4()
    return createdUser.save();
  }

  findAll(): Promise<UserDocument[] | undefined> {
    return this.UserModel.find();
  }

  async findOne(email: string): Promise<UserDocument | undefined> {
    return await this.UserModel.findOne({ email });
  }

  async findOneByID(id: any): Promise<UserDocument | undefined> {
    return await this.UserModel.findById(id);
  }
}
