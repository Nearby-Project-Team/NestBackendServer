import { Module, Logger } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { S3Service } from './s3/s3.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: S3Service,
        })
    ]
})
export class MulterProviderModule {}