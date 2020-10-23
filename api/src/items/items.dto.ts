import { ApiProperty } from '@nestjs/swagger';
import { Colors, Materials, Types } from '../data';
import { IsNumber, Min, IsDate, IsNotEmpty } from 'class-validator';

export class ItemDto {
    @ApiProperty({
        description: "Item's name",
        required: true
    })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: "Item's brand",
        required: true
    })
    @IsNotEmpty()
    readonly brand: string;

    @ApiProperty({
        description: "Item's color",
        enum: Colors,
        required: true
    })
    @IsNotEmpty()
    readonly color: string;

    @ApiProperty({
        description: "Item's type (streetwear, formal, casual, ...)",
        enum: Types,
        required: true
    })
    @IsNotEmpty()
    readonly type: string;

    @ApiProperty({
        description: "Item's material",
        enum: Materials,
        required: true
    })
    @IsNotEmpty()
    readonly material: string;

    @ApiProperty({
        description: "Item matching color",
        enum: Colors,
        isArray: true
    })
    readonly matchingColors: string[];

    @ApiProperty({
        description: "Item's price",
        minimum: 1,
        required: true
    })
    @IsNumber()
    @Min(1)
    readonly price: number;

    @ApiProperty({
        description: "Release date"
    })
    @IsNotEmpty()
    readonly releaseDate: Date;
}