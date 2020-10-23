import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/schemas/user.schema';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { CreateUserDto } from 'src/users/users.dto';
import { UserRO } from 'src/users/users.ro';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    
    private readonly logger = new Logger(AuthService.name);
    
    async register(user: CreateUserDto) {
        let status: RegistrationStatus = {
            success: true,
            message: 'user register',
        };

        try {
            if (await this.usersService.findByUsername(user.username))
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            
            await this.usersService.create(user);
        } catch (err) {
            //debug(err);
            status = { success: false, message: err };
        }

        return status;
    }

    createToken(user: User) {
        const expiresIn = 3600 * 24;

        const accessToken = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            'Manager',
            { expiresIn },
        );

        return {
            expiresIn,
            accessToken,
        };
    }
    
    async validateUserToken(payload: JwtPayload): Promise<User> {
        return await this.usersService.findById(payload.id);
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.comparePassword(password)) {
            this.logger.log('password check success');
            return user;
        }
        return null;
    }
}