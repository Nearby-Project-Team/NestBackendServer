import { ElderlyEntity } from './elderly.entity';
import { ScheduleTypeEnum } from 'src/common/types/schedule.type';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity({ name: 'Calandar' })
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
    notificationType: ScheduleTypeEnum;

    @CreateDateColumn()
    createdAt: Date
    
    @ManyToOne(type => ElderlyEntity, (elderly) => elderly.calandar)
    @JoinColumn({
        name: 'elderly_id'
    })
    elderly_id: ElderlyEntity

};