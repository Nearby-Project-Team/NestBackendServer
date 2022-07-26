import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const S3FilePath = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();
        return request.file.key;
    }
);