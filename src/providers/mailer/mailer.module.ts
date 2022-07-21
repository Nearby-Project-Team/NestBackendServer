import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigModule } from '../../common/configs/mailer/mailer.module';
import { MailerConfigService } from '../../common/configs/mailer/mailer.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: (process.env.NODE_ENV === 'production') ? './env/.production.env'
            : (process.env.NODE_ENV === 'stage') ? './env/.stage.env' : './env/.development.env'
        }),
        MailerModule.forRootAsync({
            imports: [ MailerConfigModule ],
            inject: [ MailerConfigService ],
            useClass: MailerConfigService
        })
    ]
})
export class NodeMailerModule {}