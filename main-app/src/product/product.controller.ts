import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @EventPattern('product_created')
    async create(data) {
        console.log('Product created', data);
        await this.productService.create(data);
    }

    @EventPattern('product_updated')
    async update(data) {
        console.log('Product updated', data);
        await this.productService.update(data.id, data);
     }

    async findOne(id: number) {
        return this.productService.findOne(id);
    }
}
