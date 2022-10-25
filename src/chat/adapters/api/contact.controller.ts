import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Contact } from 'src/chat/domain/model/contact.model';
import { ContactService } from 'src/chat/domain/ports/services/contact.service';

@Controller({
  path: 'contacts',
  version: ['1'],
})
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private contactService: ContactService) {}

  @Post()
  create(@Body() contactCmd: Contact): Contact {
    const { name } = contactCmd;
    const contact = this.contactService.create(name);
    this.logger.debug('contact create');
    this.logger.debug(JSON.stringify(contact));
    return contact;
  }
}
