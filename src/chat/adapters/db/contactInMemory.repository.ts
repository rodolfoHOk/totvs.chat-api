import { Injectable } from '@nestjs/common';
import { Contact } from 'src/chat/domain/model/contact.model';
import { ContactRepository } from 'src/chat/domain/ports/repositories/contact.repository';

@Injectable()
export class ContactInMemoryRepository implements ContactRepository {
  private readonly contacts: Contact[] = [];

  create(contact: Contact): Contact {
    this.contacts.push(contact);
    return contact;
  }

  findById(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  findAll(): Contact[] {
    return this.contacts;
  }
}
