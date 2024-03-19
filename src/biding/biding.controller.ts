import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BidingService } from './biding.service';
import { CreateBidingDto } from './dto/create-biding.dto';
import { User } from '../decorator/curent-user.decorator';
import { UserDocument } from 'src/schemas/users.schema';
@Controller('/bids/:id/biding')
export class BidingController {
  constructor(private readonly bidingService: BidingService) {}

  @Post()
  create(@Body() createBidingDto: CreateBidingDto,@Param('id',ParseUUIDPipe) id:string,@User() user:UserDocument) {
    return this.bidingService.create(createBidingDto,id,user.id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidingService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidingService.remove(+id);
  }
}
