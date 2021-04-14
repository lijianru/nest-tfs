import { Episode } from './episode.model';
import { Course } from './course.model';
import { User } from './user.model';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ ref: 'User' })
  @ApiProperty({ description: '用户' })
  user: Ref<User>;

  @prop({ enum: ['Course', 'Episode'] })
  @ApiProperty({ description: '所评论的类型' })
  type: string;

  @prop({ refPath: 'type' })
  @ApiProperty({ description: '对应类型的id' })
  object: Ref<Course | Episode>;

  @prop()
  @ApiProperty({ description: '评论内容' })
  content: string;
}
