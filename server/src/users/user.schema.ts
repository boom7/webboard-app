import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  username: string;

  // @Prop({ required: true, type: String })
  // password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
