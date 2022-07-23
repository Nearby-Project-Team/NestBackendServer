import { CaregiverEntity } from './caregiver.entity';
import { ElderlyEntity } from './elderly.entity';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn
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

    @ManyToOne(type => ElderlyEntity, (elderly) => elderly.voice_model)
    @JoinColumn({
        name: 'elderly_id'
    })
    elderly_id: ElderlyEntity

};