import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
  TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://yywwoddv:Iux4gR5Sp2pkqHPA6HBwVb9q1dWplY9h@sparrow.rmq.cloudamqp.com/yywwoddv'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
