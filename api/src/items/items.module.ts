import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from 'src/app.gateway';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
    imports: [
        MongooseModule.forFeature([ { name: Item.name, schema: ItemSchema } ])
    ],
    controllers: [ItemsController],
    providers: [ItemsService, AppGateway],
    exports: [ItemsService]
})
export class ItemsModule {}
