import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 自定义User装饰器
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
