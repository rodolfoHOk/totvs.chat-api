import { Inject, Injectable } from '@nestjs/common';
import { Contact } from '../../model/contact.model';
import { ContactRepository } from '../repositories/contact.repository';

@Injectable()
export class ContactService {
  constructor(
    @Inject(ContactRepository)
    private readonly contactRepository: ContactRepository,
  ) {}

  create(name: string): Contact {
    const contact = new Contact(name);
    return this.contactRepository.create(contact);
  }
}
