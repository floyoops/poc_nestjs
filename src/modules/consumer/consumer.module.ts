import {Module} from '@nestjs/common';
import {ConsumerService} from './consumer.service';
import {AmqpModule} from 'nestjs-amqp/dist';
import {pubSub} from '../article/infra/article.module';
import {configuration} from '../../configuration';

@Module({
    imports: [
        AmqpModule.forRoot(configuration.rabbitmq),
    ],
    providers: [
        ConsumerService,
        pubSub,
    ],
})

export class ConsumerModule {}
