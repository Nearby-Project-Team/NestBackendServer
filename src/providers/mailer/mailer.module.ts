import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerConfigModule } from '../../common/configs/mailer/mailer.module';
import { MailerConfigService } from '../../common/configs/mailer/mailer.config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ MailerConfigModule ],
            useClass: MailerConfigService,
            inject: [ MailerConfigService ]
        })
    ]
})
export class NodeMailerModule {}