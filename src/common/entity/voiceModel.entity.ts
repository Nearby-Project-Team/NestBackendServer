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
    status: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => CaregiverEntity, (caregiver) => caregiver.voice_model)
    @JoinColumn({
        name: 'caregiver_id'
    })
    caregiver_id: CaregiverEntity

    @OneToMany(type => VoiceModelRelationEntity, (vRelation) => vRelation.voiceModel_id)
    voiceRelation: VoiceModelRelationEntity[]

};