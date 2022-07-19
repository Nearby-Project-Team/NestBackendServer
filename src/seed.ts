import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeds/seeder.module';
import { Logger } from '@nestjs/common';
import { Seeder } from './seeds/seeder.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeederModule);
    await app.init();
    const logger = app.get(Logger);
    const seeder = app.get(Seeder);

    seeder.seed()
        .then(() => {
            logger.debug('Seeding complete!');
        })
        .catch((err) => {
            logger.error('Seeding failed!');
            logger.error(err);
        })
        .finally(() => {
            app.close();
        });
}

bootstrap();