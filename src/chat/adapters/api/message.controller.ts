import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Message } from 'src/chat/domain/model/message.model';
import { MessageService } from 'src/chat/domain/ports/services/message.service';
import { FindByUsersCommand, MessageDto } from './commands/message.command';

@Controller({
  path: 'messages',
  version: ['1'],
})
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(private messageService: MessageService) {}

  @Post()
  create(@Body() messageCmd: MessageDto): Message {
    const message = this.messageService.create(
      messageCmd.content,
      messageCmd.originId,
      messageCmd.destinationId,
    );

    return message;
  }

  @Get()
  findAll(): Message[] {
    return this.messageService.findAll();
  }

  @Get(':userLoginId/:userContactId')
  findByUsers(@Param() params: FindByUsersCommand): Message[] {
    return this.messageService.findByUsers(
      params.userLoginId,
      params.userContactId,
    );
  }
}
