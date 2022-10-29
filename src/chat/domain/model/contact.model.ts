import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidV4 } from 'uuid';

export class Contact {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(name: string, avatarUrl: string) {
    this.id = uuidV4();
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
