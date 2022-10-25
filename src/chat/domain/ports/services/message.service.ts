import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../model/message.model';
import { ContactRepository } from '../repositories/contact.repository';
import { MessageRepository } from '../repositories/message.repository';
import { SocketService } from './socket.service';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository,
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
    @Inject(SocketService)
    private readonly socketServer: SocketService,
  ) {}

  create(content: string, originId: string, destinationId: string): Message {
    const origin = this.contactRepository.findById(originId);
    const destination = this.contactRepository.findById(destinationId);

    const message = new Message(content, origin, destination);
    const createdMessage = this.messageRepository.create(message);

    this.socketServer.notifyNewMessage(
      createdMessage.destination.id,
      createdMessage.content,
    );

    return createdMessage;
  }

  findAll(): Message[] {
    return this.messageRepository.findAll();
  }

  findByUsers(userLoginId, userContactId): Message[] {
    return this.messageRepository.findByUsers(userLoginId, userContactId);
  }
}
