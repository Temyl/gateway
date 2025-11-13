import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './modules/api-gateway/gateway.controller';
import { ApiGatewayService } from './modules/api-gateway/gateway.services';
import { EnvModule } from './internals/env/env.module';
import { LoggerModule } from './internals/logger/logger.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EnvModule,
    LoggerModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
  exports: [LoggerModule, EnvModule],
})
export class AppModule {}
