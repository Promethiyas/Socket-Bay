import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument, UserWallet } from '../schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

const BCRYPT_HASH_BOUNDS = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  public async create(dto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.UserModel(dto);
    createdUser.password = await bcrypt.hash(dto.password, BCRYPT_HASH_BOUNDS);
    createdUser.id = uuidv4();
    createdUser.wallet = { balance: 0, currency: 'eur' };

    return createdUser.save();
  }

  public async findAll(): Promise<UserDocument[] | null> {
    return this.UserModel.find();
  }

  public async findOne(email: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ email });
  }

  public async findOneByID(id: any): Promise<UserDocument | null> {
    return await this.UserModel.findById(id);
  }

  public async updateWallet(
    user: UserDocument,
    dto: UpdateWalletDto,
  ): Promise<UserWallet> {
    user.wallet = {
      balance: dto.amount,
      currency: dto.currency,
    };

    return (await user.save()).wallet;
  }
}
