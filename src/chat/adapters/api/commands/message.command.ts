import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  originId: string;
  @ApiProperty()
  destinationId: string;
}

export class FindByUsersCommand {
  @ApiProperty()
  userLoginId: string;
  @ApiProperty()
  userContactId: string;
}
