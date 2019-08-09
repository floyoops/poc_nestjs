import {InjectAmqpConnection} from 'nestjs-amqp/dist';
import {Connection, ConsumeMessage} from 'amqplib';
import {Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {PubSub} from 'graphql-subscriptions';

@Injectable()
export class ConsumerService implements OnModuleInit {
    public static readonly channelName = 'testmq';
    constructor(
        @InjectAmqpConnection('rabbitmq') private connection: Connection,
        @Inject('PUB_SUB') private pubSub: PubSub,
    ) {
    }

    public async onModuleInit(): Promise<any> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(ConsumerService.channelName, { durable: true });
        await channel.consume(ConsumerService.channelName, (msg: ConsumeMessage) => {
            const contentMsg = msg.content.toString();
            this.pubSub.publish('testMq', contentMsg);
            Logger.log(`Consumer received '${contentMsg}'`, 'RabbitMq');
        }, { noAck: true });
    }
}
