import { Logger } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private readonly logger: Logger = new Logger();

  notifyNewMessage(contact: string, content: string) {
    const payload = { contact, content };
    this.server.emit('new_message', payload);
  }

  afterInit(server: any) {
    this.logger.debug('Web Socket Init');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Cliente connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.debug(`Cliente disconnected: ${client.id}`);
  }
}
