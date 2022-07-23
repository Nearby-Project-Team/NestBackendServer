import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Module({
    imports: [
        AwsSdkModule.forRootAsync({
            defaultServiceOptions: {
                useFactory: (cs: ConfigService) => {
                    return {
                        region: cs.get<string>('AWS_REGION'),
                        credentials: {
                            accessKeyId: cs.get<string>('AWS_ACCESS_KEY'),
                            secretAccessKey: cs.get<string>('AWS_SECRET_KEY')
                        }
                    };
                },
                imports: [ ConfigModule ],
                inject: [ ConfigService ]
            },
            services: [S3]
        })
    ],
    providers: [],
    exports: []
})
export class AWSProviderModule {}