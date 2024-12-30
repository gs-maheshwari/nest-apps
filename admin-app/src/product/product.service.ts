import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async get(id): Promise<Product> {
        return this.productRepository.getId(id);
    }

    async create(data): Promise<Product> {
        return this.productRepository.save(data);
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({ where: { id } });
    }

    async update(id: number, data): Promise<Product> {
        await this.productRepository.update(id, data);
        return this.productRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
