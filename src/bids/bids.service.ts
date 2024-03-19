import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { Bid, BidDocument } from 'src/schemas/bids.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import { UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class BidsService {
  constructor(@InjectModel(Bid.name) private BidModel: Model<Bid>) {}

  async create(createBidDto: CreateBidDto, user: UserDocument): Promise<BidDocument> {
    const createdBid = new this.BidModel(createBidDto);
    createdBid.id = uuidv4()
    createdBid.user = user.id
    createdBid.biding_id= uuidv4()
    return createdBid.save();
  }

  public async findOneByID(id: string): Promise<BidDocument | undefined> {
    return await this.BidModel.findOne({ id },'id name description initialprice user biding_id',{
      includeResultMetadata: false
    });
  }
}
