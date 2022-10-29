import { Inject, Injectable } from '@nestjs/common';
import { Contact } from '../../model/contact.model';
import { ContactRepository } from '../repositories/contact.repository';
import { MessageRepository } from '../repositories/message.repository';

@Injectable()
export class ContactService {
  constructor(
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) {}

  create(name: string, avatarUrl: string): Contact {
    const contact = new Contact(name, avatarUrl);
    return this.contactRepository.create(contact);
  }

  findAll(): Contact[] {
    return this.contactRepository.findAll();
  }

  findByUser(userLoginId: string): Contact[] {
    const contacts = this.contactRepository.findAll();
    return contacts.filter(
      (contact) =>
        this.messageRepository.findByUsers(userLoginId, contact.id).length,
    );
  }
}
