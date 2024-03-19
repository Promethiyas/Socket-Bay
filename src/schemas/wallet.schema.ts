import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


@Schema()
export class Wallet {
  @Prop()
  id: UUID;

  @Prop()
  ownerid: string;

  @Prop()
  balance: number;

  @Prop()
  currency: string

}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
export type WalletDocument = HydratedDocument<Wallet>;
