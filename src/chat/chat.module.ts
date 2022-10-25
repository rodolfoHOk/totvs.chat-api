import { Module } from '@nestjs/common';

import { ContactController } from './adapters/api/contact.controller';
import { ContactInMemoryRepository } from './adapters/db/contactInMemory.repository';
import { MessageInMemoryRepository } from './adapters/db/messageInMemory.repository';
import { ContactRepository } from './domain/ports/repositories/contact.repository';
import { MessageRepository } from './domain/ports/repositories/message.repository';
import { ContactService } from './domain/ports/services/contact.service';

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    { provide: ContactRepository, useClass: ContactInMemoryRepository },
    { provide: MessageRepository, useClass: MessageInMemoryRepository },
  ],
})
export class ChatModule {}
