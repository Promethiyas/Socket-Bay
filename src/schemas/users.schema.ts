import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';


@Schema()
export class User {
  @Prop()
  id: UUID;

  @Prop()
  username: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

// export const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   email: String,
//   phone: String,
//   age: Number,
//   adress: String,
// });
