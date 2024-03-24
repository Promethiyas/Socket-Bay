import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument, Types } from 'mongoose';

export type BidingEntry = {
  ownerId: string
  amount: number
}

@Schema()
export class Bid {
  @Prop()
  id: UUID;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  initialPrice: number;

  @Prop()
  images: string[];

  @Prop()
  user: string;

  @Prop()
  bidings: BidingEntry[]
}

export const BidSchema = SchemaFactory.createForClass(Bid);
export type BidDocument = HydratedDocument<Bid>;
