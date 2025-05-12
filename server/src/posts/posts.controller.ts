import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ExpressRequest } from '../auth/types/express-request.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: ExpressRequest,
  ) {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    return this.postsService.create(
      createPostDto,
      req.user.sub,
      req.user.username,
    );
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: any,
    @Req() req: ExpressRequest,
  ) {
    if (!req.user) {
      throw new Error('User not authenticated');
    }

    return this.postsService.update(id, req.user.sub, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: ExpressRequest) {
    await this.postsService.delete(id, req.user.sub);
    return { message: 'Post deleted successfully' };
  }
}
