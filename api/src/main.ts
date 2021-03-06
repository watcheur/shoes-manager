import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	const options = new DocumentBuilder()
		.addBearerAuth()
		.setTitle("Manager API")
		.setVersion("0.0.1")
		.build();
	
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: 'http://localhost:3000'
	});
	app.use(helmet());
	app.use(rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 1500 // 100 request per window
	}))
	
	await app.listen(3005);
}
bootstrap();
