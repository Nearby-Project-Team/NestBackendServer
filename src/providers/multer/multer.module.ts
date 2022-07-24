import { Module, Logger } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { S3Service } from './s3/s3.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: S3Service,
        })
    ]
})
export class MulterProviderModule {}