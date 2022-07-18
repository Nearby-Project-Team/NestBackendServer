import { DataSource } from "typeorm";
import { CaregiverEntity } from "src/common/entity/caregiver.entity";
import { ElderlyEntity } from "src/common/entity/elderly.entity";
import { ChattingEntity } from "src/common/entity/chatting.entity";
import { CalandarEntity } from 'src/common/entity/calandar.entity';
import { VerificationEntity } from "src/common/entity/verificationLog.entity";
import { VoiceFileEntity } from "src/common/entity/voiceFile.entity";
import { VoiceModelEntity } from "src/common/entity/voiceModel.entity";

export function getSeedDataSource() { 
    return new DataSource({
        type: 'mysql',
        database: 'nearby',
        host: '127.0.0,1',
        username: 'nearby',
        password: 'n3@rbYP@sswD12#$',
        port: 3306,
        entities: [
            CaregiverEntity,
            ElderlyEntity,
            ChattingEntity,
            CalandarEntity,
            VerificationEntity,
            VoiceFileEntity,
            VoiceModelEntity
        ]
    });
};