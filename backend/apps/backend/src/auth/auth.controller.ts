import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './currentUser.decorator';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const user = await this.userModel.create({
      ...dto,
    });

    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '登陆' })
  @UseGuards(AuthGuard('local')) // 在local strategy处理登陆验证
  async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    return {
      token: this.jwtService.sign(String(user._id)), // 生成token
      username: user.username,
    };
  }

  @Get('user')
  @ApiOperation({ summary: '用token获取个人信息' })
  @UseGuards(AuthGuard('jwt')) // 校验token
  @ApiBearerAuth() // 在swagger上允许添加token
  async user(@CurrentUser() user: DocumentType<User>) {
    return user;
  }
}
