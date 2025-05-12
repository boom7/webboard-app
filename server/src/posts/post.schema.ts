import { Schema, Document } from 'mongoose';

export const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Post extends Document {
  title: string;
  content: string;
  authorId: string;
  username: string;
  createdAt: Date;
}
