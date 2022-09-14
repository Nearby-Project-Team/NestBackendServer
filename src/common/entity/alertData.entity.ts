import { AlertVoiceFileEntity } from './alertVoiceFile.entity';
import { 
    BaseEntity, 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from 'typeorm';

@Entity({ name: 'Alarm' })
export class AlertDataEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'longtext'
    })
    alarm: string;

    @Column({
        type: 'text'
    })
    alarm_type: string;

    @OneToMany(type => AlertVoiceFileEntity, (valert) => valert.alert_data)
    alert_voice: AlertVoiceFileEntity[];

}