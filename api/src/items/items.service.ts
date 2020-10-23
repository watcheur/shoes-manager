import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument, ItemSchema } from './schemas/item.schema';
import { ItemDto } from './items.dto';

export class ItemFindQuery {
    name: string | object;
    brand: string | object;
    color: string;
    type: string;
    material: string;
}

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>
    ){}

    public async findAll(query: ItemFindQuery): Promise<Item[]> {
        let where = new ItemFindQuery();
        if (query.name)
            where.name = { $regex: query.name, $options: 'i' }
        if (query.brand)
            where.brand = { $regex: query.brand, $options: 'i' }
        if (query.color)
            where.color = query.color;
        if (query.type)
            where.type = query.type;
        if (query.material)
            where.material = query.material;

        return this.itemModel.find(where).exec();
    }

    public async findById(id: string): Promise<Item | null> {
        return this.itemModel.findById(id).exec();
    }

    public async create(itemDto: ItemDto): Promise<Item> {
        const createdItem = new this.itemModel(itemDto);
        return createdItem.save();
    }

    public async update(id: string, itemDto: Partial<ItemDto>): Promise<Item | null> {
        return await this.itemModel.updateOne({ _id: id }, { $set: itemDto }).exec();
    }

    public async delete(id: string): Promise<Boolean> {
        const res =  await this.itemModel.deleteOne({ _id: id }).exec();
        return res.deletedCount > 0;
    }
}
