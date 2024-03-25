import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bid, BidDocument } from 'src/schemas/bids.schema';
import { UserDocument } from 'src/schemas/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateBidDto } from './dto/create-bid.dto';
import { CreateBidingDto } from './dto/create-biding.dto';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(Bid.name)
    private readonly BidModel: Model<Bid>,
  ) {}

  async create(dto: CreateBidDto, user: UserDocument): Promise<BidDocument> {
    const bid = new this.BidModel(dto);
    bid.id = uuidv4();
    bid.user = user.id;

    return bid.save();
  }

  public async findOneByID(id: string): Promise<BidDocument | null> {
    return await this.BidModel.findOne({ id });
  }

  public async createBiding(
    bidId: string,
    user: UserDocument,
    dto: CreateBidingDto,
  ): Promise<BidDocument> {
    const bid = await this.findOneByID(bidId);
    if (!bid) throw new NotFoundException('No bid match to the given uuid.');

    const most = bid.bidings
      .map((b) => b.amount)
      .reduce((prev, curr) => (curr > prev ? curr : prev), bid.initialPrice);

    if (dto.amount <= most) {
      throw new UnauthorizedException(
        'Cannot POST biding with less amount than previous.',
      );
    }

    bid.bidings.push({ ownerId: user.id, amount: dto.amount });

    return bid.save();
  }
}
