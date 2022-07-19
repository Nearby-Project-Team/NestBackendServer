import { Injectable, Logger } from '@nestjs/common';
import { CaregiverSeederService } from './seedService/Caregiver/caregiver.seed';
import { ElderlySeederService } from './seedService/Elderly/elderly.seed';

@Injectable()
export class Seeder {
    constructor (
        private readonly logger: Logger,
        private readonly caregiverSeederService: CaregiverSeederService,
        private readonly elderlySeederService: ElderlySeederService,
    ) {}

    async seed() {
        this.logger.debug("Start to Seed Data");
        
        const caregiverResults = await this.caregiverSeeding();
        this.printSeedingLog(caregiverResults, "Caregiver");
        const elderlyResults = await this.elderlySeeding();
        this.printSeedingLog(elderlyResults, "Elderly");

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

}