import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contact } from 'src/chat/domain/model/contact.model';
import { ContactService } from 'src/chat/domain/ports/services/contact.service';
import { ContactDto, FindByUserDto } from './commands/contact.command';

@Controller({
  path: 'contacts',
  version: ['1'],
})
@ApiTags('Contacts')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create contact' })
  @ApiResponse({ status: 201, description: 'Created', type: Contact })
  create(@Body() contactCmd: ContactDto): Contact {
    const { name } = contactCmd;
    const contact = this.contactService.create(name);
    this.logger.debug('contact create');
    this.logger.debug(JSON.stringify(contact));
    return contact;
  }

  @Get()
  @ApiOperation({ summary: 'List all contacts' })
  @ApiResponse({ status: 200, description: 'Ok', type: [Contact] })
  findAll(): Contact[] {
    return this.contactService.findAll();
  }

  @Get(':userLoginId')
  @ApiOperation({ summary: 'List user contacts' })
  @ApiResponse({ status: 200, description: 'Ok', type: [Contact] })
  findByUser(@Param() params: FindByUserDto): Contact[] {
    return this.contactService.findByUser(params.userLoginId);
  }
}
