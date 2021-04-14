import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/currentUser.decorator';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index(@Query('query') query) {
    const params = JSON.parse(query);
    return this.commentModel
      .find()
      .populate('user')
      .where(params.where)
      .setOptions(params);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    return await this.commentModel.create(dto);
  }
}
