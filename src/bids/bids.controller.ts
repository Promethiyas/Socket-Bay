import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { User } from '../decorator/curent-user.decorator';
import { UserDocument } from 'src/schemas/users.schema';

@Controller('/bids')
export class BidsController {
  constructor(private readonly BidsService: BidsService) {}

  @Post()
  async create(@Body() createBidDto: CreateBidDto, @User() user:UserDocument) {
    return await this.BidsService.create(createBidDto,user);
  }

  @Get('/:id')
  async findOneByID(@Param('id',ParseUUIDPipe) id:string) {
    
    return await this.BidsService.findOneByID(id);
    
  }
}
