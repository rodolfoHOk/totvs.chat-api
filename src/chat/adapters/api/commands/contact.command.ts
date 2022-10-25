import { ApiProperty } from '@nestjs/swagger';

export class FindByUserDto {
  @ApiProperty()
  userLoginId: string;
}
