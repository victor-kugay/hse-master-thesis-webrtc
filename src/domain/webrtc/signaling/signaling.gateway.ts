import {WebsocketGateway} from '@/modules/websocket/websocket.gateway';
import {Injectable, OnModuleInit} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

const channels: any = {};
const sockets: any = {};
const peers: any = {};

@Injectable()
export class SignalingGateway implements OnModuleInit {
  constructor(
    private readonly websocketGateway: WebsocketGateway,
    @InjectPinoLogger(SignalingGateway.name)
    private readonly logger: PinoLogger
  ) {}

  public onModuleInit() {
    this.websocketGateway['server'].on('connection', this.handleConnectionEvent);
  }

  private handleConnectionEvent = (socket: any) => {
    const socketHostName = '';

    socket.channels = {};
    sockets[socket.id] = socket;

    this.logger.info('[' + socket.id + '] connection accepted');
    socket.on('disconnect', () => {
      for (const channel in socket.channels) {
        part(channel);
      }
      this.logger.info('[' + socket.id + '] disconnected');
      delete sockets[socket.id];
    });

    socket.on('join', (config: any) => {
      this.logger.info({
        message: '[' + socket.id + '] join ', 
        payload: config
      });
      const channel = socketHostName + config.channel;

      // Already Joined
      if (channel in socket.channels) return;

      if (!(channel in channels)) {
        channels[channel] = {};
      }

      if (!(channel in peers)) {
        peers[channel] = {};
      }

      peers[channel][socket.id] = {
        userData: config.userData,
      };

      this.logger.info({
        message: '[' + socket.id + '] join - connected peers grouped by channel',
        payload: peers
      });

      for (const id in channels[channel]) {
        channels[channel][id].emit('addPeer', {
          peer_id: socket.id,
          should_create_offer: false,
          channel: peers[channel],
        });
        socket.emit('addPeer', {
          peer_id: id,
          should_create_offer: true,
          channel: peers[channel],
        });
      }

      channels[channel][socket.id] = socket;
      socket.channels[channel] = channel;
    });

    socket.on('updateUserData', async (config: any) => {
      const channel = socketHostName + config.channel;
      const key = config.key;
      const value = config.value;
      for (let id in peers[channel]) {
        if (id == socket.id) {
          peers[channel][id]['userData'][key] = value;
        }
      }
      this.logger.info({
        message: '[' + socket.id + '] updateUserData',
        payload: peers[channel][socket.id]
      });
    });

    const part = (channel: string) => {
      // Socket not in channel
      if (!(channel in socket.channels)) return;

      delete socket.channels[channel];
      delete channels[channel][socket.id];

      delete peers[channel][socket.id];
      if (Object.keys(peers[channel]).length == 0) {
        // last peer disconnected from the channel
        delete peers[channel];
      }
      this.logger.info({
        message: '[' + socket.id + '] part - connected peers grouped by channel',
        payload: peers
      });

      for (const id in channels[channel]) {
        channels[channel][id].emit('removePeer', {peer_id: socket.id});
        socket.emit('removePeer', {peer_id: id});
      }
    };

    socket.on('relayICECandidate', (config: any) => {
      let peer_id = config.peer_id;
      let ice_candidate = config.ice_candidate;
      this.logger.info({
        message: '[' + socket.id + '] relay ICE-candidate to [' + peer_id + '] ',
        payload: ice_candidate,
      });

      if (peer_id in sockets) {
        sockets[peer_id].emit('iceCandidate', {
          peer_id: socket.id,
          ice_candidate: ice_candidate,
        });
      }
    });

    socket.on('relaySessionDescription', (config: any) => {
      let peer_id = config.peer_id;
      let session_description = config.session_description;
      this.logger.info({
        message: '[' + socket.id + '] relay SessionDescription to [' + peer_id + '] ',
        payload: session_description,
      });

      if (peer_id in sockets) {
        sockets[peer_id].emit('sessionDescription', {
          peer_id: socket.id,
          session_description: session_description,
        });
      }
    });
  };
}
