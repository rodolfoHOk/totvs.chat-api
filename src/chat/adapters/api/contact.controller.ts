import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Contact } from 'src/chat/domain/model/contact.model';
import { ContactService } from 'src/chat/domain/ports/services/contact.service';
import { ContactDto, FindByUserDto } from './commands/contact.command';

@Controller({
  path: 'contacts',
  version: ['1'],
})
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private contactService: ContactService) {}

  @Post()
  create(@Body() contactCmd: ContactDto): Contact {
    const { name } = contactCmd;
    const contact = this.contactService.create(name);
    this.logger.debug('contact create');
    this.logger.debug(JSON.stringify(contact));
    return contact;
  }

  @Get()
  findAll(): Contact[] {
    return this.contactService.findAll();
  }

  @Get(':userLoginId')
  findByUser(@Param() params: FindByUserDto): Contact[] {
    return this.contactService.findByUser(params.userLoginId);
  }
}
