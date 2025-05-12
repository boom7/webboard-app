import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/community-board',
    ),
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'posts', method: RequestMethod.POST },
      {
        path: 'posts/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'posts/:id',
        method: RequestMethod.PUT,
      },
      { path: 'posts/:postId/comments', method: RequestMethod.POST },
      {
        path: 'posts/:postId/comments/:commentId',
        method: RequestMethod.DELETE,
      },
      {
        path: 'posts/:postId/comments/:commentId',
        method: RequestMethod.PUT,
      },
    );
  }
}
