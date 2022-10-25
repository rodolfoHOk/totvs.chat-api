import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';
import { Contact } from './contact.model';

export class Message {
  @ApiProperty()
  id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  origin: Contact;
  @ApiProperty()
  destination: Contact;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(content: string, origin: Contact, destination: Contact) {
    this.id = uuidV4();
    this.content = content;
    this.origin = origin;
    this.destination = destination;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
