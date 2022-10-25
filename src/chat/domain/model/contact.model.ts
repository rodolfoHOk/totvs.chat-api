import { v4 as uuidV4 } from 'uuid';

export class Contact {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string) {
    this.id = uuidV4();
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
