import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Colors, Materials, Types } from "src/data";

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
    @Prop()
    name: string;

    @Prop({ required: true })
    brand: string;
    
    @Prop({ required: true, enum: Colors})
    color: string;

    @Prop({ required: true, enum: Types })
    type: string;

    @Prop({ required: true, enum: Materials })
    material: string;

    @Prop([String])
    matchingColors: string[];

    @Prop()
    price: number;

    @Prop()
    releaseDate: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);