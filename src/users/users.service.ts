import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }, '-password').exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id, '-password').exec();

    // const cacheKey = `user_${id}`;
    // const cachedUser = await this.cacheManager.get(cacheKey) as UserDocument;

    // if (cachedUser) {
    //   return cachedUser;
    // }

    // const user = await this.userModel.findById(id).exec();
    // if (user) {
    //   await this.cacheManager.set(cacheKey, user); // Cache for 10 minutes
    // }
    // return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, '-password').exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    return savedUser.toJSON();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result.deletedCount > 0;
  }
}
