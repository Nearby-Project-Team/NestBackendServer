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

@Entity('Caregiver')
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
    status: 5

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

    @OneToMany(type => ElderlyEntity, (elderly) => elderly.cargiver_id)
    elderly: ElderlyEntity[]

    @OneToMany(type => VoiceFileEntity, (voice_file) => voice_file.caregiver_id)
    voice_file: VoiceFileEntity[]

    @OneToMany(type => VoiceModelEntity, (voice_model) => voice_model.caregiver_id)
    voice_model: VoiceModelEntity[]

    @OneToMany(type => VerificationEntity, (verification) => verification.caregiver_id)
    verification_id: VerificationEntity[]

}