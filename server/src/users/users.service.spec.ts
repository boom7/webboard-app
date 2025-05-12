import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;
  let jwtService: JwtService;

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signInOrCreate', () => {
    it('should return a token if the user exists', async () => {
      mockUserModel.findOne.mockResolvedValueOnce({
        _id: 'mockId',
        username: 'existingUser',
      });

      const result = await service.signInOrCreate('existingUser');

      expect(result).toBe('mock-token');
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'mockId',
        username: 'existingUser',
      });
    });

    it('should create a new user and return a token if the user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null); // User does not exist
      mockUserModel.create.mockResolvedValueOnce({
        _id: 'mockId',
        username: 'newUser',
      });

      const result = await service.signInOrCreate('newUser');

      expect(result).toBe('mock-token');
      expect(mockUserModel.create).toHaveBeenCalledWith({
        username: 'newUser',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'mockId',
        username: 'newUser',
      });
    });
  });

  describe('findByUsername', () => {
    it('should return the user if exists', async () => {
      const user = { _id: 'mockId', username: 'existingUser' };
      mockUserModel.findOne.mockResolvedValueOnce(user);

      const result = await service.findByUsername('existingUser');

      expect(result).toEqual(user);
    });

    it('should return null if the user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);

      const result = await service.findByUsername('nonExistingUser');

      expect(result).toBeNull();
    });
  });
});
