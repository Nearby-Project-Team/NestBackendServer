import { Injectable } from '@nestjs/common';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';

@Injectable()
export class ChatService {
    constructor (
        private readonly cgRepository: CaregiverRepository,
        private readonly elderlyRepository: ElderlyRepository
    ) {}

    

}
