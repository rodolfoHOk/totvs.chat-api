import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../../model/message.model';
import { ContactRepository } from '../repositories/contact.repository';
import { MessageRepository } from '../repositories/message.repository';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository,
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
  ) {}

  create(content: string, originId: string, destinationId: string): Message {
    const origin = this.contactRepository.findById(originId);
    const destination = this.contactRepository.findById(destinationId);

    const message = new Message(content, origin, destination);
    return this.messageRepository.create(message);
  }

  findAll(): Message[] {
    return this.messageRepository.findAll();
  }

  findByUsers(userLoginId, userContactId): Message[] {
    return this.messageRepository.findByUsers(userLoginId, userContactId);
  }
}
