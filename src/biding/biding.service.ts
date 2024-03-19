import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBidingDto } from './dto/create-biding.dto';
import {v4 as uuidv4} from 'uuid';
import { Biding, BidingSchema } from 'src/schemas/biding.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BidsService } from 'src/bids/bids.service';
import { BidingDocument } from 'src/schemas/biding.schema';
@Injectable()
export class BidingService {
  constructor(
    @InjectModel(Biding.name)
    private BidingModel: Model<Biding>,
    @Inject(forwardRef(() => BidsService))
    private readonly bids: BidsService
  ) {}


  // async create(createBidingDto: CreateBidingDto,id:any,user:any) {
  //   const createdBiding = new this.BidingModel(createBidingDto);
  //   const bidss = await this.bids.findOneByID(id)
  //   const biding_id_test = bidss.biding_id
  //   createdBiding.id = bidss.biding_id
  //   createdBiding.user_id =user
  //   return createdBiding.save();
  // }

  async create(createBidingDto: CreateBidingDto,id:any,user:any) {
    const mongoose = require("mongoose"); 
    const LastBid = mongoose.model("Biding", BidingSchema); 

    const createdBiding = new this.BidingModel(createBidingDto);
    const bidss = await this.bids.findOneByID(id)
    const biding_id_test = bidss.biding_id
    const lastbid = await this.findOneByID( biding_id_test)
    if (lastbid == null){
      createdBiding.id = bidss.biding_id
      createdBiding.user_id =user
      return createdBiding.save();
    }else{
      if (createdBiding.biding_amount < lastbid.biding_amount || createBidingDto.biding_amount < bidss.initialprice ){
        return "You can only bid an amount superior to the last offer"
      }else{
        createdBiding.id = bidss.biding_id
        createdBiding.user_id =user
        await createdBiding.updateOne({id: createdBiding.id},{user_id:createdBiding.user_id,biding_amount:createdBiding.biding_amount})
        return "Nice";
      }
    }
  }




  async findOneByID(id: string): Promise<BidingDocument | undefined> {
    return await this.BidingModel.findOne({ id });
  }
  findOne(id: number) {
    return `This action returns a #${id} biding`;
  }


  remove(id: number) {
    return `This action removes a #${id} biding`;
  }
}
