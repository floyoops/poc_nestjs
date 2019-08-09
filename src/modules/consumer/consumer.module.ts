import {Module} from '@nestjs/common';
import {ConsumerService} from './consumer.service';
import {AmqpModule} from 'nestjs-amqp/dist';
import {pubSub} from '../article/infra/article.module';

const optionsRabbitMq = {
    name: 'rabbitmq',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
};

@Module({
    imports: [
        AmqpModule.forRoot(optionsRabbitMq),
    ],
    providers: [
        ConsumerService,
        pubSub,
    ],
})

export class ConsumerModule {}
