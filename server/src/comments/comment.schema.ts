import { Schema, Document } from 'mongoose';

export const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Comment extends Document {
  postId: string;
  content: string;
  authorId: string;
  username: string;
  createdAt: Date;
}
