import {WebSocketGateway, WebSocketServer, OnGatewayConnection} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';

export type SocketWithChannels = Socket & {channels: any};
export type WebsocketGatewaySubscriber<T> = (client: WebsocketClient, payload: T) => void;

export class WebsocketClient {
  constructor(
    private readonly server: Server,
    private readonly socket: SocketWithChannels,
  ) {}

  public getSocketId() {
    return this.socket.id;
  }

  public getChannels() {
    return this.socket.channels || {};
  }

  public deleteChannel(channel: string) {
    delete this.socket.channels[channel];
  }

  public emit<T>(event: string, data: T) {
    this.socket.emit(event, data);
  }

  public addChannel(channel: string) {
    if (!this.socket.channels) this.socket.channels = {};
    this.socket.channels[channel] = channel;
  }
}

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  protected readonly server!: Server;

  private subscribers = new Map();

  public handleConnection(socket: SocketWithChannels) {
    const client = new WebsocketClient(this.server, socket);
    this.subscribers.forEach((subscriber, event) => {
      socket.on(event, (data: unknown) => subscriber(client, data));
    });
  }

  public on<T>(event: string, callback: WebsocketGatewaySubscriber<T>) {
    this.subscribers.set(event, callback);
  }
}
