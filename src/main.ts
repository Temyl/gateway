import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './internals/logger/logger.services';
import { ApiGatewayService } from './modules/api-gateway/gateway.services';
import { rabbitmqConnection } from './modules/rabbitmq/rabbitmq.connection';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = app.get(AppLogger);
    const gatewayService = app.get(ApiGatewayService);
    const config = app.get(ConfigService);

    const connection = await rabbitmqConnection(config, logger);
    const channel = await connection.createChannel();
    gatewayService.initRabbit(channel);

    const PORT = config.get<number>('PORT') || 8110;
    await app.listen(PORT);
    logger.log(`API Gateway running on port ${PORT}`);
}
bootstrap();
