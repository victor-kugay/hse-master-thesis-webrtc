import {Module} from '@nestjs/common';
import {WebsocketModule} from '@/modules/websocket/websocket.module';
import {SignalingGateway} from './signaling.gateway';

@Module({
  imports: [WebsocketModule],
  providers: [SignalingGateway],
})
export class SignalingModule {}
