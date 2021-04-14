import { ReturnModelType } from '@typegoose/typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode,
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map((v) => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '课时管理',
      translate: false,
      column: [
        {
          prop: 'course',
          label: '所属课程',
          type: 'select',
          dicData: courses,
          row: true,
        },
        { prop: 'name', label: '课时名称', span: 24 },
        {
          prop: 'file',
          label: '视频文件',
          span: 24,
          width: '120px',
          listType: 'picture-img',
          type: 'upload',
          action: '/upload',
        },
      ],
    };
  }
}
