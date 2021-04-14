import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@libs/common/common.module';
import { diskStorage } from 'multer';
import * as nuid from 'nuid';

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      dest: 'uploads',
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: './uploads',
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }), // 可配置为云存储地址
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
