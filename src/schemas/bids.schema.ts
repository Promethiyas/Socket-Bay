import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


@Schema()
export class Bid {
  @Prop()
  id: UUID;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  initialprice: number;

  @Prop()
  imageb64: string[];

  @Prop()
  user: string;

  @Prop()
  biding_id: string;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
export type BidDocument = HydratedDocument<Bid>;
