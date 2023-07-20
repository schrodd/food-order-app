import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway {
  @WebSocketServer() private server: Server;

  handleConnection(client: Socket) {
    // on connection, add socket to a group with the id of the commerce
    // so it can receive data updates from other tabs or devices instantly
    const userId = client.handshake.query?.userId || 'no-id';
    client.join(userId);
  }

  dataUpdate(userId = 'group') {
    // event that tells frontend that data has been updated and must be fetched again
    this.server.to(userId).emit('data-update');
  }

  @SubscribeMessage('event')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    return 'recibido';
  }
}
