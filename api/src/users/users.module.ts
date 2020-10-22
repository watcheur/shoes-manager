import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserDocument, UserSchema } from 'src/users/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const schema = UserSchema;
                    schema.methods.comparePassword = async function(attempt: string) {
                        return await bcrypt.compare(attempt, this.password);
                    }

                    schema.pre<UserDocument>('save', function (next: Function) {
                        const user = this;

                        if (user.password)
                        {
                            bcrypt.hash(user.password, 10, (err, hash) => {
                                if (err) return next(err);

                                user.password = hash;
                                next();
                            })
                        }
                    })
                    return schema;
                }
            }
        ])
    ],
	controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
