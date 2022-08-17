import { CaregiverEntity } from './caregiver.entity';
import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn, 
    Column,
    CreateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { AlertDataEntity } from './alertData.entity';


@Entity({
    name: "AlertVoiceFile"
})
export class AlertVoiceFileEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({
        type: 'longtext'
    })
    text: string;

    @Column({
        type: 'text'
    })
    path: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => CaregiverEntity, (caregiver) => caregiver.alert_id)
    @JoinColumn({
        name: 'caregiver_id'
    })
    caregiver_id: CaregiverEntity

    @ManyToOne(type => AlertDataEntity, (dalert) => dalert.alert_voice)
    @JoinColumn({
        name: 'alert_type_id'
    })
    alert_data: AlertDataEntity;

}