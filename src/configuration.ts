import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const optionsMysql: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'toor',
    database: 'poc_nestjs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    keepConnectionAlive: true,
};

const optionsRabbitMq = {
    name: 'rabbitmq',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
};

export const configuration = {
    db: optionsMysql,
    rabbitmq: optionsRabbitMq,
};
