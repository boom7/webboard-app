import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ExpressRequest } from '../auth/types/express-request.interface';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() createCommentDto: any,
    @Req() req: ExpressRequest,
  ) {
    return this.commentsService.create(
      createCommentDto,
      postId,
      req.user.sub,
      req.user.username,
    );
  }

  @Get()
  async findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @Put(':commentId')
  async update(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: any,
    @Req() req: ExpressRequest,
  ) {
    if (!req.user) {
      throw new Error('User not authenticated');
    }

    return this.commentsService.update(
      postId,
      commentId,
      req.user.sub,
      updateCommentDto,
    );
  }

  @Delete(':commentId')
  async delete(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Req() req: ExpressRequest,
  ) {
    await this.commentsService.delete(postId, commentId, req.user.sub);
    return { message: 'Comment deleted successfully' };
  }
}
