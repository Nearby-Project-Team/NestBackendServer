import { ElderlyEntity } from './elderly.entity';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    BaseEntity,
    ManyToOne
} from 'typeorm';

@Entity({name: 'Calandar'})
export class CalandarEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'longtext'
    })
    contents: string

    @Column({
        type: 'varchar',
        length: 50
    })
    ScheduleDate: string

    @Column({
        type: 'varchar',
        length: 50
    })
    notificationType

    @CreateDateColumn()
    createdAt: Date
    
    @ManyToOne(type => ElderlyEntity, (elderly) => elderly.calandar)
    elderly_id: ElderlyEntity

};