import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLogger } from 'src/internals/logger/logger.services';
import { EnvModule } from './internals/env/env.module';
import { ApiGatewayController } from './modules/api-gateway/gateway.controller';
import { ApiGatewayService } from './modules/api-gateway/gateway.services';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [
    ApiGatewayController
  ],
  providers: [
    AppLogger,
    ApiGatewayService
  ],
  exports: [
    AppLogger,
    EnvModule,
  ],
})
export class AppModule {}
