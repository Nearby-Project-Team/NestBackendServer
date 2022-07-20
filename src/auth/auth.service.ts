import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaregiverEntity } from 'src/common/entity/caregiver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(CaregiverEntity) 
        private cgRepository: Repository<CaregiverEntity>,
    ) {}

    

}
