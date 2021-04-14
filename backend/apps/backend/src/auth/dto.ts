import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: 'richard' })
  username: string;

  @ApiProperty({ description: '密码', example: '111' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'richard' })
  username: string;

  @ApiProperty({ description: '密码', example: '111' })
  password: string;
}
