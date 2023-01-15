import {Module} from '@nestjs/common';
import {WebRtcModule} from './webrtc';

@Module({
  imports: [WebRtcModule],
})
export class DomainModule {}
