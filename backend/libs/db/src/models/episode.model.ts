import { Course } from './course.model';
import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop() // 将此字段作为数据库的字段
  @ApiProperty({ description: '课时名称' })
  name: string;

  @prop()
  @ApiProperty({ description: '课时文件' })
  file: string;

  @prop({ ref: 'Course' })
  @ApiProperty({ description: '课时所关联的课程' })
  course: Ref<Course>;
}
