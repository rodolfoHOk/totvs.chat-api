import { ApiProperty } from '@nestjs/swagger';

export class FindByUserDto {
  @ApiProperty()
  userLoginId: string;
}

export class ContactDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatarUrl: string;
}
