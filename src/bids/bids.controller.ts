import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  forwardRef,
} from '@nestjs/common';
import { UserDocument } from 'src/schemas/users.schema';
import { User } from '../decorator/curent-user.decorator';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { BidDocument } from 'src/schemas/bids.schema'
import { CreateBidingDto } from './dto/create-biding.dto'

@Controller('/bids')
export class BidsController {
  constructor(
    @Inject(forwardRef(() => BidsService))
    private readonly bids: BidsService,
  ) {}

  @Post()
  public async create(
    @Body() dto: CreateBidDto,
    @User() user: UserDocument,
  ) {
    return await this.bids.create(dto, user);
  }

  @Get('/:id')
  public async findOneByID(@Param('id', ParseUUIDPipe) id: string): Promise<BidDocument> {
    return this.bids.findOneByID(id);
  }

  @Post('/:id')
  public async postBiding(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserDocument,
    @Body() dto: CreateBidingDto
  ): Promise<BidDocument> {
    return this.bids.createBiding(id, user, dto);
  }
}
