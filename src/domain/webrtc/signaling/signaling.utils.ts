import {Socket} from 'socket.io';

export function getRoomId(socket: Socket, roomId: string): string | undefined {
  return socket.handshake.headers.host?.split(':')[0] + ':' + roomId;
}
