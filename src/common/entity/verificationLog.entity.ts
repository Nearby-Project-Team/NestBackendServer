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

@Entity({name: 'UserVerificationLog'})
export class VerificationEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'varchar',
        length: 50
    })
    verification_type: string

    @Column({
        type: 'varchar',
        length: 50
    })
    verification_token: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => CaregiverEntity, (caregiver) => caregiver.verification_id)
    @JoinColumn({
        name: 'caregiver_id'
    })
    caregiver_id: CaregiverEntity

};