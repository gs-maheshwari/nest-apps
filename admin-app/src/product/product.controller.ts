import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService,
         @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Post()
    async create(@Body() body: { name: string, price: number }) {
        const product = await this.productService.create(body);
        console.log('Product created', product);
        this.client.emit('product_created', product);
        return product;
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { name: string, price: number }) {
        const product =  await this.productService.update(id, body);
        this.client.emit('product_updated', product);
        return product;
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.productService.remove(id);

        this.client.emit('product_deleted', id);
    }
}
