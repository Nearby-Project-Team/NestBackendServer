import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { CalandarEntity } from '../../../common/entity/calandar.entity';
import { CalandarSeederService } from './calandar.seed';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ElderlyEntity,
            CalandarEntity
        ]),
    ],
    providers: [ CalandarSeederService ],
    exports: [ CalandarSeederService ]
})
export class CalandarSeederModule {}