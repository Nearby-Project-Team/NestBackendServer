import { Module } from "@nestjs/common";
import { MailerConfigService } from "./mailer.config";

@Module({
    providers: [ MailerConfigService ]
})
export class MailerConfigModule {}