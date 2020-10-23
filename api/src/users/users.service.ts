import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ){}

    public async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    public async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    public async findByUsername(name: string) : Promise<User | null> {
        return this.userModel.findOne({ username: name }).exec();
    }

    public async create(user: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
}
