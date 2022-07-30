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

@Entity({ name: 'Chatting' })
export class ChattingEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'longtext'
    })
    contents: string

    @Column({
        type: 'boolean'
    })
    sender: boolean

    @Column({
        type: 'datetime'
    })
    createdAt: Date

    @ManyToOne(type => ElderlyEntity, (elderly) => elderly.chatting)
    @JoinColumn({
        name: 'elderly_id'
    })
    elderly_id: ElderlyEntity

};