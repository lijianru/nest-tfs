import { Episode } from './episode.model';
import { ApiProperty } from '@nestjs/swagger';
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
  options: {
    allowMixed: 0, // https://typegoose.github.io/typegoose/docs/api/decorators/model-options/#allowmixed
  },
})
export class Course {
  @prop()
  @ApiProperty({ description: '课程名称' })
  name: string;

  @prop()
  @ApiProperty({ description: '封面' })
  cover: string;

  @arrayProp({
    ref: 'Episode',
    localField: '_id', // 关联健，使用Course中的_id关联Episode
    foreignField: 'course', // 外健
  })
  episodes: Ref<Episode>[];
}
