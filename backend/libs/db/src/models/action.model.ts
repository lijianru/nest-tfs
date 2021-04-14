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
export class Action {
  @prop({ ref: 'User' })
  @ApiProperty({ description: '用户' })
  user: Ref<User>;

  @prop({ enum: ['Course', 'Episode'] })
  @ApiProperty({ description: '操作的类型' })
  type: string;

  @prop({ refPath: 'type' })
  @ApiProperty({ description: '对应类型的id' })
  object: Ref<Course | Episode>;

  @prop({ enum: ['like', 'upVote'] })
  @ApiProperty({ description: '对此id的操作' })
  name: string;
}
