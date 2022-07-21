import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
    constructor(private configService: ConfigService) {}

    createMailerOptions(): MailerOptions {
        const mailer_email = this.configService.get<string>('MAILER_ADDRESS');
        const mailer_password = this.configService.get<string>('MAILER_PASSWORD');
        const mailer_host = this.configService.get<string>('MAILER_HOST');
        const mailer_username = this.configService.get<string>('MAILER_USERNAME');

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