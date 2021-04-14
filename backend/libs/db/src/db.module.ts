import { Comment } from './models/comment.model';
import { Action } from './models/action.model';
import { Episode } from './models/episode.model';
import { User } from './models/user.model';
import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Course } from './models/course.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,
  Action,
  Comment,
]);

@Global()
@Module({
  imports: [
    // 异步链接数据库
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    // TypegooseModule.forRoot(process.env.DB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
