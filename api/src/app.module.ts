import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb+srv://mathieu:watcheur@cluster0.atpjr.mongodb.net/nest?retryWrites=true&w=majority'),
		AuthModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
