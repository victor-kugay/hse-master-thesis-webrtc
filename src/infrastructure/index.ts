import {Module} from '@nestjs/common';
// Инфраструктурные модули
import {ConfigModule} from './config/config.module';
import {LoggerModule} from './logger/logger.module';
import {StaticModule} from './static/static.module';
import {StatusModule} from './status/status.module';
import {WebsocketModule} from './websocket/websocket.module';

@Module({
  imports: [StaticModule, ConfigModule, LoggerModule, StatusModule, WebsocketModule],
})
export class InfrastructureModule {}
