import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService, private httpService: HttpService) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.get(Number(id));
        this.httpService.post(`http://localhost:8000/api/products/${id}/like`,
             {}).subscribe();
        return this.productService.update(id, { likes: product.likes + 1 });
    }

    @EventPattern('product_created')
    async create(data) {
        await this.productService.create(data);
    }

    @EventPattern('product_updated')
    async update(data) {
        await this.productService.update(data.id, data);
     }

    async findOne(id: number) {
        return this.productService.findOne(id);
    }
}
