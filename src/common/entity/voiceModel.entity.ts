import { CaregiverEntity } from './caregiver.entity';
import { VoiceModelRelationEntity } from './voiceRelation.entity';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { VoiceTypeEnum } from '../types/voice.type';
import { AlertVoiceFileEntity } from './alertVoiceFile.entity';

@Entity({ name: 'VoiceModel' })
export class VoiceModelEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'text'
    })
    path: string

    @Column({
        type: 'varchar',
        length: '10'
    })
    status: VoiceTypeEnum

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => CaregiverEntity, (caregiver) => caregiver.voice_model)
    @JoinColumn({
        name: 'caregiver_id'
    })
    caregiver_id: CaregiverEntity

    @OneToMany(type => VoiceModelRelationEntity, (vRelation) => vRelation.voiceModel_id)
    voiceRelation: VoiceModelRelationEntity[]

    @OneToMany(type => AlertVoiceFileEntity, (alert_voice) => alert_voice.voice_id)
    alert_id: AlertVoiceFileEntity[];

};