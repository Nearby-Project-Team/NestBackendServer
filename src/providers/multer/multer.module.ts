import { Module, Logger } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { S3Service } from './s3/s3.service';
import { AWSProviderModule } from '../aws/aws.module';


@Module({
    imports: [
        AWSProviderModule,
        MulterModule.registerAsync({
            useClass: S3Service,
        })
    ]
})
export class MulterProviderModule {}