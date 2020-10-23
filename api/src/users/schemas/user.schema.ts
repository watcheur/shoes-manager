import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ required: true, unique: true })
	username: string;
	
	@Prop({ required: true })
	password: string;
	
	async comparePassword(attempt: string): Promise<boolean> {
		return false;
	}
}

export const UserSchema = SchemaFactory.createForClass(User);