import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemDto } from './items.dto';
import { ItemFindQuery, ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { Colors, Materials, Types } from '../data';
import { AppGateway } from 'src/app.gateway';

@ApiTags('items')
@Controller('items')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly appGateway: AppGateway
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiQuery({ name: "name", required: false })
    @ApiQuery({ name: "brand", required: false })
    @ApiQuery({ name: "color", required: false, enum: Colors })
    @ApiQuery({ name: "type", required: false, enum: Types })
    @ApiQuery({ name: "material", required: false, enum: Materials })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all items with givens parameters' })
    @Get()
    public async getAll(@Query() query: ItemFindQuery) : Promise<Item[]> {
        return await this.itemsService.findAll(query);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get given item' })
    @Get(':id')
    public async get(@Param('id') id: string) : Promise<Item> {
        const item = await this.itemsService.findById(id);
        if (!item)
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        return item;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new item' })
    @Post()
    public async create(@Body() newItem: ItemDto) : Promise<Item> {
        const res = await this.itemsService.create(newItem);

        this.appGateway.emit('ITEMS', {
            action: 'ITEM_CREATED',
            data: {
                item: res
            }
        });

        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a given item' })
    @Put(':id')
    public async update(@Param('id') id: string, @Body() newValue: Partial<ItemDto>) : Promise<Item> {
        const item = await this.itemsService.findById(id);
        if (!item)
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        await this.itemsService.update(id, newValue);

        const newItem = await this.itemsService.findById(id);

        this.appGateway.emit('ITEMS', {
            action: 'ITEM_UPDATED',
            data: {
                item: newItem
            }
        });

        return newItem;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Detele a given item' })
    @ApiBearerAuth()
    @Delete(':id')
    public async delete(@Param('id') id: string) : Promise<Boolean> {
        const item = await this.itemsService.findById(id);
        if (!item)
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        const res = await this.itemsService.delete(id);

        this.appGateway.emit('ITEMS', {
            action: 'ITEM_DELETED',
            data: {
                item: item
            }
        });

        return res;
    }
}
