import {Module} from '@nestjs/common';
import {ConsumerService} from './consumer.service';
import {AmqpModule} from 'nestjs-amqp/dist';

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
    ],
})

export class ConsumerModule {}
