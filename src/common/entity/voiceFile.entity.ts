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

@Entity({ name: 'VoiceFile' })
export class VoiceFileEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'text'
    })
    path: string

    @Column({
        type: 'datetime'
    })
    trainDate: Date

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => CaregiverEntity, (caregiver) => caregiver.voice_file)
    @JoinColumn({
        name: 'caregiver_id'
    })
    caregiver_id: CaregiverEntity

};