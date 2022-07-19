import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLConfigService } from '../../../common/configs/typeorm/typeorm.config';
import { MySqlConfigModule } from '../../../common/configs/typeorm/typeorm.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: (process.env.NODE_ENV === 'production') ? './env/.production.env'
            : (process.env.NODE_ENV === 'stage') ? './env/.stage.env' : './env/.development.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ MySqlConfigModule ],
            useClass: MySQLConfigService,
            inject: [ MySQLConfigService ]
        })
    ]
})
export class MySQLDBProviderModule {}