import { Injectable, Logger } from '@nestjs/common';
import { CaregiverSeederService } from './seedService/Caregiver/caregiver.seed';
import { ElderlySeederService } from './seedService/Elderly/elderly.seed';
import { VerificationLogSeederService } from './seedService/VerificationLog/verification.seed';
import { CalandarSeederService } from './seedService/Calandar/calandar.seed';
import { ChattingSeederService } from './seedService/Chatting/chatting.seed';

@Injectable()
export class Seeder {
    constructor (
        private readonly logger: Logger,
        private readonly caregiverSeederService: CaregiverSeederService,
        private readonly elderlySeederService: ElderlySeederService,
        private readonly verificationSeederService: VerificationLogSeederService,
        private readonly calandarSeederService: CalandarSeederService,
        private readonly chattingSeederService: ChattingSeederService
    ) {}

    async seed() {
        this.logger.debug("Start to Seed Data");
        
        const caregiverResults = await this.caregiverSeeding();
        this.printSeedingLog(caregiverResults, "Caregiver");
        const elderlyResults = await this.elderlySeeding();
        this.printSeedingLog(elderlyResults, "Elderly");
        const verificationResult = await this.verificationSeeding();
        this.printSeedingLog(verificationResult, "Verification Log");
        const calandarResult = await this.calandarSeeding();
        this.printSeedingLog(calandarResult, "Calandar");
        const chattingResult = await this.chattingSeeding();
        this.printSeedingLog(chattingResult, "Chatting");

        this.logger.debug("Finished to Seed Data");
    }

    printSeedingLog(resultList: Array<boolean>, logsType: string) {
        if (resultList.includes(false)) {
            this.logger.debug(`Failed to Seeding ${logsType} Data!`);
        } else {
            this.logger.debug(`Successfully Seed ${logsType} Data!`);
        }
    }

    async caregiverSeeding() {
        this.logger.debug('Seeding Caregiver Data...');
        return await Promise.all(this.caregiverSeederService.create())
    }

    async elderlySeeding() {
        this.logger.debug('Seeding Elderly Data...');
        return await Promise.all(this.elderlySeederService.create());
    }

    async verificationSeeding() {
        this.logger.debug('Seeding Verification Data...');
        return await Promise.all(this.verificationSeederService.create());
    }

    async calandarSeeding() {
        this.logger.debug('Seeding Calandar Data...');
        return await Promise.all(this.calandarSeederService.create());
    }

    async chattingSeeding() {
        this.logger.debug('Seeding Chatting Data...');
        return await Promise.all(this.chattingSeederService.create());
    }

}