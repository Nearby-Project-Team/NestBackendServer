import { CaregiverEntity } from './caregiver.entity';
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

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => CaregiverEntity)
    @JoinColumn({
        name: 'caregiver_id'
    })
    caregiver_id: CaregiverEntity

};