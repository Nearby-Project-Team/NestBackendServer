import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'nearby',
    password: 'Ne@rByAuTh54!2',
    database: 'nearby',
    entities: [ 'dist/**/*.entity.{ts,js}' ],
    synchronize: true
};