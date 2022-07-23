import { VoiceModelEntity } from './voiceModel.entity';
import { ElderlyEntity } from './elderly.entity';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity({ name: 'VoiceModelRelation' })
export class VoiceModelRelationEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => VoiceModelEntity, (vModel) => vModel.voiceRelation)
    @JoinColumn({
        name: 'voiceModel_id'
    })
    voiceModel_id: VoiceModelEntity

    @ManyToOne(type => ElderlyEntity, (elderly) => elderly.voiceRelation)
    @JoinColumn({
        name: 'elderly_id'
    })
    elderly_id: ElderlyEntity

}