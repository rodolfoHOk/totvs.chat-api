import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from 'src/chat/domain/model/message.model';
import { MessageService } from 'src/chat/domain/ports/services/message.service';
import { FindByUsersCommand, MessageDto } from './commands/message.command';

@Controller({
  path: 'messages',
  version: ['1'],
})
@ApiTags('Messages')
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(private messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Create message' })
  @ApiResponse({ status: 201, description: 'Created', type: Message })
  create(@Body() messageCmd: MessageDto): Message {
    const message = this.messageService.create(
      messageCmd.content,
      messageCmd.originId,
      messageCmd.destinationId,
    );

    this.logger.debug('message create');
    this.logger.debug(JSON.stringify(message));

    return message;
  }

  @Get()
  @ApiOperation({ summary: 'List all messages' })
  @ApiResponse({ status: 200, description: 'Ok', type: [Message] })
  findAll(): Message[] {
    return this.messageService.findAll();
  }

  @Get(':userLoginId/:userContactId')
  @ApiOperation({ summary: 'List messages between users' })
  @ApiResponse({ status: 200, description: 'Ok', type: [Message] })
  findByUsers(@Param() params: FindByUsersCommand): Message[] {
    return this.messageService.findByUsers(
      params.userLoginId,
      params.userContactId,
    );
  }
}
