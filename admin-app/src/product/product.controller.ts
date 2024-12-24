import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Post()
    async create(@Body() body: { name: string, price: number }) {
        return this.productService.create(body);
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { name: string, price: number }) {
        return this.productService.update(id, body);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }
}
