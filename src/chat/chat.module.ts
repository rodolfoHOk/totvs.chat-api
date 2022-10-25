import { Module } from '@nestjs/common';

import { ContactController } from './adapters/api/contact.controller';
import { MessageController } from './adapters/api/message.controller';
import { ContactInMemoryRepository } from './adapters/db/contactInMemory.repository';
import { MessageInMemoryRepository } from './adapters/db/messageInMemory.repository';
import { ContactRepository } from './domain/ports/repositories/contact.repository';
import { MessageRepository } from './domain/ports/repositories/message.repository';
import { ContactService } from './domain/ports/services/contact.service';
import { MessageService } from './domain/ports/services/message.service';
import { SocketService } from './domain/ports/services/socket.service';

@Module({
  controllers: [ContactController, MessageController],
  providers: [
    ContactService,
    { provide: ContactRepository, useClass: ContactInMemoryRepository },
    MessageService,
    { provide: MessageRepository, useClass: MessageInMemoryRepository },
    SocketService,
  ],
})
export class ChatModule {}
