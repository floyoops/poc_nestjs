import {InjectAmqpConnection} from 'nestjs-amqp/dist';
import {Connection} from 'amqplib';
import {Injectable, Logger, OnModuleInit} from '@nestjs/common';

@Injectable()
export class ConsumerService implements OnModuleInit {
    public static readonly channelName = 'testmq';
    constructor(
        @InjectAmqpConnection('rabbitmq') private connection: Connection,
    ) {
    }

    public async onModuleInit(): Promise<any> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(ConsumerService.channelName, { durable: true });
        await channel.consume(ConsumerService.channelName, (msg) => {
            Logger.log(`Consumer received '${msg.content.toString()}'`, 'RabbitMq');
        }, { noAck: true });
    }
}
