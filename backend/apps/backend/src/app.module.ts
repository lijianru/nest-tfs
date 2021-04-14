import { CommonModule } from '@libs/common/common.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [CommonModule, CoursesModule, AuthModule, ActionsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
