import { Module } from '@nestjs/common';

import { ContactController } from './adapters/api/contact.controller';
import { ContactInMemoryRepository } from './adapters/db/contactInMemory.repository';
import { ContactRepository } from './domain/ports/repositories/contact.repository';
import { ContactService } from './domain/ports/services/contact.service';

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    { provide: ContactRepository, useClass: ContactInMemoryRepository },
  ],
})
export class ChatModule {}
