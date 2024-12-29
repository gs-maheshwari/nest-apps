import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
 
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://yywwoddv:Iux4gR5Sp2pkqHPA6HBwVb9q1dWplY9h@sparrow.rmq.cloudamqp.com/yywwoddv'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    }
  );
  app.listen().then(() => console.log('Microservice is listening'));
}
bootstrap();
