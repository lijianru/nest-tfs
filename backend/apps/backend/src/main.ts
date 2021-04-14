import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 允许跨域访问
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('WEB APP API')
    .setDescription('这是供WEB APP使用的API')
    .setVersion('1.0')
    .addBearerAuth() // 启用输入token的功能
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const BACKEND_PORT = process.env.BACKEND_PORT;
  await app.listen(BACKEND_PORT);
  console.log(`http://localhost:${BACKEND_PORT}/docs`);
}
bootstrap();
