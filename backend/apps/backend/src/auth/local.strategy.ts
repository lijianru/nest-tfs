import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private readonly userModal: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'username', // 从登陆dto传入的登陆名
      passwordField: 'password', // 从登陆dto传入的密码
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    // 使用用户名去查找该user
    const user = await this.userModal.findOne({ username }).select('+password');

    if (!user) {
      throw new BadRequestException('该用户不存在');
    }

    // 对比密码是否正确
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }

    return user;
  }
}
