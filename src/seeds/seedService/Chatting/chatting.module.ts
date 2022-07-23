import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElderlyEntity } from '../../../common/entity/elderly.entity';
import { ChattingEntity } from '../../../common/entity/chatting.entity';
import { ChattingSeederService } from './chatting.seed';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ElderlyEntity,
            ChattingEntity
        ])
    ],
    providers: [ ChattingSeederService ],
    exports: [ ChattingSeederService ]
})
export class ChattingSeederModule {}