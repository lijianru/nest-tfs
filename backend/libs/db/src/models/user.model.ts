import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop() // 将此字段作为数据库的字段
  @ApiProperty({ description: '用户名', example: 'richard' })
  username: string;

  @prop({
    select: false, // 不显示此字段
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val; // 对密码进行散列处理
    },
  })
  @ApiProperty({ description: '密码', example: '123' })
  password: string;
}
