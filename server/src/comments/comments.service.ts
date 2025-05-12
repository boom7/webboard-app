import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async create(
    createCommentDto: any,
    postId: string,
    userId: string,
    username: string,
  ): Promise<Comment> {
    const comment = new this.commentModel({
      ...createCommentDto,
      postId,
      authorId: userId,
      username,
    });
    return comment.save();
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).sort({ createdAt: -1 }); //
  }

  async delete(
    postId: string,
    commentId: string,
    userId: string,
  ): Promise<void> {
    const comment = await this.commentModel.findOne({ _id: commentId, postId });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId.toString() !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }

    await this.commentModel.deleteOne({ _id: commentId }).exec();
  }

  async update(
    postId: string,
    commentId: string,
    userId: string,
    updateCommentDto: any,
  ): Promise<Comment> {
    const comment = await this.commentModel.findOne({ _id: commentId, postId });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId.toString() !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this comment',
      );
    }

    return this.commentModel.findByIdAndUpdate(commentId, updateCommentDto, {
      new: true,
    });
  }
}
