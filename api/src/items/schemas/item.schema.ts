import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
    @Prop()
    name: string;

    @Prop({ required: true })
    brand: string;
    
    @Prop({ required: true, enum: [ 'WHITE', 'BLACK', 'RED', 'ORANGE', 'BLUE', 'GREEN' ] })
    color: string;

    @Prop({ required: true, enum: [ 'SPORT', 'CASUAL', 'CEREMONY' ] })
    type: string;

    @Prop({ required: true, enum: [ 'LEATHER', 'CLOTH', 'PLASTIC' ] })
    material: string;

    @Prop([String])
    matchingColors: string[];

    @Prop()
    price: number;

    @Prop()
    releaseDate: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);