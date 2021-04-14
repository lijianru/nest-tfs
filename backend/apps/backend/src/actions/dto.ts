import { ApiProperty } from '@nestjs/swagger';
export class ActionDto {
  @ApiProperty({ description: '用户ID', example: '' })
  user: string;

  @ApiProperty({ description: '类型', example: 'Course' })
  type: string;

  @ApiProperty({ description: 'ID', example: '5ffa8140fb8c7a4c8775b558' })
  object: string;

  @ApiProperty({ description: 'action', example: 'like' })
  name: string;
}
