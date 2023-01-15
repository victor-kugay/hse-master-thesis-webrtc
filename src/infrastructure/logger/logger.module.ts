import {Module} from '@nestjs/common';
import {LoggerModule as LoggerModuleNest} from 'nestjs-pino';
import {StatusController} from '../status/status.controller';
import {LOGGER_AUTO_LOGGING, LOGGER_TRANSPORT} from './logger.constants';

@Module({
  imports: [
    LoggerModuleNest.forRoot({
      forRoutes: [StatusController],
      pinoHttp: {
        autoLogging: LOGGER_AUTO_LOGGING,
        transport: LOGGER_TRANSPORT,
      },
    }),
  ],
})
export class LoggerModule {}
