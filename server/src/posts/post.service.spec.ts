import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

describe('PostsService', () => {
  let service: PostsService;
  let model: Model<Post>;

  const mockPostModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken('Post'), useValue: mockPostModel },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    model = module.get<Model<Post>>(getModelToken('Post'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a post', async () => {
      const createPostDto = { title: 'Test', content: 'Content' };
      const userId = 'user123';
      const username = 'testuser';
      const savedPost = { ...createPostDto, authorId: userId, username };

      const mockSave = jest.fn().mockResolvedValue(savedPost);
      const mockPostInstance = { save: mockSave };

      const postService = new PostsService(
        jest.fn(() => mockPostInstance) as any,
      );

      const result = await postService.create(createPostDto, userId, username);

      expect(result).toEqual(savedPost);
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const posts = [{ title: 'A' }, { title: 'B' }];
      mockPostModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue(posts),
      });

      const result = await service.findAll();
      expect(result).toEqual(posts);
    });
  });

  describe('findOne', () => {
    it('should return the post by id', async () => {
      const post = { _id: '1', title: 'Post' };
      mockPostModel.findById.mockReturnValueOnce({ exec: () => post });

      const result = await service.findOne('1');
      expect(result).toEqual(post);
    });
  });

  describe('update', () => {
    it('should update and return the post if authorized', async () => {
      const post = { _id: '1', authorId: 'user123', toString: () => 'user123' };
      mockPostModel.findById.mockResolvedValueOnce(post);
      mockPostModel.findByIdAndUpdate.mockResolvedValueOnce({
        ...post,
        title: 'Updated',
      });

      const result = await service.update('1', 'user123', { title: 'Updated' });
      expect(result.title).toEqual('Updated');
    });

    it('should throw if user is not the author', async () => {
      const post = { _id: '1', authorId: 'user456', toString: () => 'user456' };
      mockPostModel.findById.mockResolvedValueOnce(post);

      await expect(
        service.update('1', 'user123', { title: 'Updated' }),
      ).rejects.toThrow('Unauthorized to update this post');
    });

    it('should throw if post is not found', async () => {
      mockPostModel.findById.mockResolvedValueOnce(null);
      await expect(service.update('1', 'user123', {})).rejects.toThrow(
        'Post not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete the post if authorized', async () => {
      const post = { _id: '1', authorId: 'user123', toString: () => 'user123' };
      mockPostModel.findOne.mockResolvedValueOnce(post);
      mockPostModel.deleteOne.mockReturnValueOnce({ exec: jest.fn() });

      await expect(service.delete('1', 'user123')).resolves.toBeUndefined();
    });

    it('should throw if user is not the author', async () => {
      const post = { _id: '1', authorId: 'user456', toString: () => 'user456' };
      mockPostModel.findOne.mockResolvedValueOnce(post);

      await expect(service.delete('1', 'user123')).rejects.toThrow(
        'Unauthorized to delete this post',
      );
    });
  });
});
