import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

  // 允许跨域访问
  app.enableCors();

  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const options = new DocumentBuilder()
    .setTitle('后台管理系统API')
    .setDescription('这是后台管理系统API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const ADMIN_PORT = process.env.ADMIN_PORT;
  await app.listen(ADMIN_PORT);
  console.log(`http://localhost:${ADMIN_PORT}/docs`);
}
bootstrap();
