import { forwardRef, Module } from '@nestjs/common';
import { BidingService } from './biding.service';
import { BidingController } from './biding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Biding, BidingSchema } from 'src/schemas/biding.schema';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Biding.name, schema: BidingSchema }]),
    forwardRef(()=>BidsModule)
  ],
  controllers: [BidingController],
  providers: [BidingService],
})
export class BidingModule {}
