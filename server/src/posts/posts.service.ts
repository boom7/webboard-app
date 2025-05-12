import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(
    createPostDto: any,
    userId: string,
    username: string,
  ): Promise<Post> {
    const post = new this.postModel({
      ...createPostDto,
      authorId: userId,
      username,
    });
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: -1 }); //
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async update(
    postId: string,
    userId: string,
    updatePostDto: any,
  ): Promise<Post> {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId.toString() !== userId) {
      throw new Error('Unauthorized to update this post');
    }

    return this.postModel.findByIdAndUpdate(postId, updatePostDto, {
      new: true,
    });
  }

  async delete(postId: string, userId: string): Promise<void> {
    const post = await this.postModel.findOne({ _id: postId });
    if (post.authorId.toString() !== userId) {
      throw new Error('Unauthorized to delete this post');
    }

    await this.postModel.deleteOne({ _id: postId }).exec();
  }
}
