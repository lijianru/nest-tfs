import { User } from '@libs/db/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { Action } from '@libs/db/models/action.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/currentUser.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActionDto } from './dto';

@Controller('actions')
@ApiTags('收藏')
export class ActionsController {
  constructor(
    @InjectModel(Action)
    private readonly actionModel: ReturnModelType<typeof Action>,
  ) {}

  @Get('status')
  @ApiOperation({ summary: '获取当前课程是否收藏' })
  @UseGuards(AuthGuard('jwt'))
  async getStatus(
    @Query() dto: ActionDto,
    @CurrentUser() user: DocumentType<User>,
  ) {
    dto.user = user._id;
    const count = await this.actionModel.countDocuments(dto);

    return {
      status: count > 0,
    };
  }

  @Post('toggle')
  @ApiOperation({ summary: '收藏/取消收藏' })
  @UseGuards(AuthGuard('jwt'))
  async toggle(
    @Body() dto: ActionDto,
    @CurrentUser() user: DocumentType<User>,
  ) {
    dto.user = user._id;

    const result = await this.getStatus(dto, user);

    if (result.status) {
      await this.actionModel.deleteMany(dto);
    } else {
      await this.actionModel.create(dto);
    }

    return await this.getStatus(dto, user);
  }
}
