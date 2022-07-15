import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class MySQLConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        console.log(this.configService.get<string>('DATABASE_PASSWORD'));
        console.log(this.configService.get<string>('DATABASE_HOST'));
        return {
            type: 'mysql',
            username: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            port: +this.configService.get<number>('DATABASE_PORT'),
            host: this.configService.get<string>('DATABASE_HOST'),
            database: this.configService.get<string>('DATABASE_NAME'),
            entities: ['dist/**/**/*.entity{.ts,.js}'],
            synchronize: true,
            migrations: [ 'src/seeds/*.ts' ]
        }
    }

}