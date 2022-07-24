import { Module, Logger } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { S3Service } from './s3/s3.service';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: S3Service,
            imports: [ ConfigModule ],
            inject: [ ConfigService ]
        })
    ]
})
export class MulterProviderModule {}