import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import path from 'path';

export class MailerConfigService implements MailerOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMailerOptions(): MailerOptions {
        const mailer_email = this.configService.get('MAILER_ADDRESS');
        const mailer_password = this.configService.get('MAILER_PASSWORD');
        const mailer_host = this.configService.get('MAILER_HOST');
        const mailer_username = this.configService.get('MAILER_USERNAME');

        return {
            transport: `smtps://${mailer_email}:${mailer_password}@${mailer_host}`,
            defaults: {
                from: `"${mailer_username}" <${mailer_email}>`
            },
            template: {
                dir: path.join(__dirname, '/views/'),
                adapter: new EjsAdapter(),
                options: {
                    strict: true
                }
            }
        };
    }
}