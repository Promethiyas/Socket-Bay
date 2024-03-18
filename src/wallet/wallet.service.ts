import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from 'src/schemas/wallet.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/users.schema';
import { WalletDocument } from 'src/schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet.name) private WalletModel: Model<Wallet>) {}


  async create(createWalletDto: CreateWalletDto, user: UserDocument): Promise<WalletDocument> {
    const createdWallet = new this.WalletModel(createWalletDto);
    createdWallet.id = user.wallet
    createdWallet.ownerid = user.id
    return createdWallet.save();
  }


  async findOneByID(id: any): Promise<WalletDocument | undefined> {
    return await this.WalletModel.findOne({ id },'id ownerid balance currency',{
      includeResultMetadata: false
    });
  }
}
