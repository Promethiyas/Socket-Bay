import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/users.schema';
import { WalletDocument } from 'src/schemas/wallet.schema';
import { UpdateWalletDto} from './dto/update-wallet.dto'
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

  async updateWalletMas(updateWalletDto: UpdateWalletDto, user: UserDocument){
    const balencebefore = this.WalletModel.findOne({ownerid :user.id})
    return await this.WalletModel.updateOne({ownerid: user.id},{balance: updateWalletDto.newbalance + (await balencebefore).balance});
  }

  async updateWalletMenos(updateWalletDto: UpdateWalletDto, user: UserDocument){
    const balencebefore = this.WalletModel.findOne({ownerid :user.id})
    return await this.WalletModel.updateOne({ownerid: user.id},{balance: (await balencebefore).balance - updateWalletDto.newbalance});
  }
}
