import { ReturnModelType } from '@typegoose/typegoose';
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '用户管理',
      column: [{ prop: 'username', label: '用户名' }],
    };
  }
}
