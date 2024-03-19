import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


@Schema()
export class Biding {
    @Prop()
    id: UUID
    @Prop()
    user_id: string;
    @Prop()
    biding_amount: number;

}

export const BidingSchema = SchemaFactory.createForClass(Biding);
export type BidingDocument = HydratedDocument<Biding>;
