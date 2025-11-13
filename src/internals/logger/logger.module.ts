import { Module } from '@nestjs/common';
import { AppLogger } from './logger.services';
import * as winston from 'winston';
import { winstonLogger } from '.';


const winstonProvider = {
  provide: 'winston',
  useFactory: () => winston.createLogger(winstonLogger()),
};

@Module({
  providers: [winstonProvider, AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
