import { ElderlyEntity } from './elderly.entity';
import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    BaseEntity,
    ManyToOne
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

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => ElderlyEntity, (elderly) => elderly.chatting)
    elderly_id: ElderlyEntity

};