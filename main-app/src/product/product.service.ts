import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
import { filter } from 'rxjs';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {
        
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async create(data: any): Promise<Product> {
        const product = new this.productModel(data);
        return product.save();
    }

    async update(id: any, data: any): Promise<Product> {
        return this.productModel.findOneAndUpdate({ id }, data)
    }

    async findOne(id: any): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async get(id: any): Promise<Product> {
        const products = this.productModel.find().exec();
        const product = (await products).filter(p => p.id === id)[0];
        return product;
    }
}
