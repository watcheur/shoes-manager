import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemsService } from './items/items.service';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppGateway } from './app.gateway';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/test'),
		AuthModule,
		UsersModule,
		ItemsModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor
		},
		AppGateway
	],
})
export class AppModule {}
