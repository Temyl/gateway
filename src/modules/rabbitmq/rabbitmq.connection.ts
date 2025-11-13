import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from 'src/internals/logger/logger.services';

export async function rabbitmqConnection(config: ConfigService, logger: AppLogger) {
    const url = config.get<string>('RABBIT_MQ_URL');
    if (!url) throw new Error("RABBIT_MQ_URL not defined");

    try {
        const connection = await amqp.connect(url);
        logger.log(`Connected to RabbitMQ`);
        return connection;
    } catch (err) {
        logger.error('Failed to connect to RabbitMQ', err);
        throw err;
    }
}
