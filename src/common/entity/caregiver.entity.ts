import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
    BeforeInsert,
    OneToMany
} from 'typeorm';
import { hash, genSalt }  from 'bcrypt';
import { ElderlyEntity } from './elderly.entity';
import { VoiceFileEntity } from './voiceFile.entity';
import { VoiceModelEntity } from './voiceModel.entity';
import { VerificationEntity } from './verificationLog.entity';
import { AlertVoiceFileEntity } from './alertVoiceFile.entity';

@Entity({ name: 'Caregiver' })
export class CaregiverEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string

    @Column({
        type: 'varchar', 
        length: 100 
    })
    name: string

    @Column({
        type: 'varchar',
        unique: true,
        length: 100
    })
    email: string

    @Column({
        type: 'varchar', 
        length: 255
    })
    password: string

    @Column({ 
        type: 'varchar',
        length: 5 
    })
    status: string

    @Column({ 
        type: 'varchar',
        length: 5 
    })
    agreement: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 30
    })
    phone_number: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    token: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
    }

    @OneToMany(type => ElderlyEntity, (elderly) => elderly.caregiver_id)
    elderly: ElderlyEntity[]

    @OneToMany(type => VoiceFileEntity, (voice_file) => voice_file.caregiver_id)
    voice_file: VoiceFileEntity[]

    @OneToMany(type => VoiceModelEntity, (voice_model) => voice_model.caregiver_id)
    voice_model: VoiceModelEntity[]

    @OneToMany(type => VerificationEntity, (verification) => verification.caregiver_id)
    verification_id!: VerificationEntity[]

    @OneToMany(type => AlertVoiceFileEntity, (alert_voice) => alert_voice.caregiver_id)
    alert_id: AlertVoiceFileEntity[];

}