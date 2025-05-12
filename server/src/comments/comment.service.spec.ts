import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentModel: Model<Comment>;

  const mockCommentModel = {
    new: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken('Comment'),
          useValue: mockCommentModel,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentModel = module.get<Model<Comment>>(getModelToken('Comment'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a comment', async () => {
      const dto = { content: 'Nice post!' };
      const mockSavedComment = {
        ...dto,
        postId: 'post123',
        authorId: 'user123',
        username: 'john',
      };

      const mockSave = jest.fn().mockResolvedValue(mockSavedComment);
      const mockInstance = { save: mockSave };
      const modelConstructor = jest.fn(() => mockInstance);

      const commentService = new CommentsService(modelConstructor as any);
      const result = await commentService.create(
        dto,
        'post123',
        'user123',
        'john',
      );

      expect(modelConstructor).toHaveBeenCalledWith({
        ...dto,
        postId: 'post123',
        authorId: 'user123',
        username: 'john',
      });
      expect(result).toEqual(mockSavedComment);
    });
  });

  describe('findByPost', () => {
    it('should return comments for the given post', async () => {
      const comments = [{ content: 'Comment 1' }, { content: 'Comment 2' }];
      mockCommentModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(comments),
      });

      const result = await service.findByPost('post123');

      expect(result).toEqual(comments);
      expect(mockCommentModel.find).toHaveBeenCalledWith({ postId: 'post123' });
    });
  });

  describe('update', () => {
    it('should update and return the updated comment', async () => {
      const comment = { _id: 'c1', authorId: 'user123' };
      const updatedComment = { ...comment, content: 'Updated' };

      mockCommentModel.findOne.mockResolvedValue(comment);
      mockCommentModel.findByIdAndUpdate.mockResolvedValue(updatedComment);

      const result = await service.update('post1', 'c1', 'user123', {
        content: 'Updated',
      });

      expect(result).toEqual(updatedComment);
    });

    it('should throw NotFoundException if comment does not exist', async () => {
      mockCommentModel.findOne.mockResolvedValue(null);

      await expect(
        service.update('post1', 'c1', 'user123', { content: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not the author', async () => {
      mockCommentModel.findOne.mockResolvedValue({ authorId: 'anotherUser' });

      await expect(
        service.update('post1', 'c1', 'user123', { content: 'Updated' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('delete', () => {
    it('should delete the comment', async () => {
      const comment = { authorId: 'user123' };
      mockCommentModel.findOne.mockResolvedValue(comment);
      mockCommentModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({}),
      });

      await service.delete('post1', 'c1', 'user123');

      expect(mockCommentModel.deleteOne).toHaveBeenCalledWith({ _id: 'c1' });
    });

    it('should throw NotFoundException if comment does not exist', async () => {
      mockCommentModel.findOne.mockResolvedValue(null);

      await expect(service.delete('post1', 'c1', 'user123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user is not the author', async () => {
      mockCommentModel.findOne.mockResolvedValue({ authorId: 'anotherUser' });

      await expect(service.delete('post1', 'c1', 'user123')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
