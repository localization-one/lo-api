import {MigrationInterface, QueryRunner} from "typeorm";
import { SCHEMAS } from '../const';

export class InitialSchemas1622978337521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema(SCHEMAS.USERS);
        await queryRunner.createSchema(SCHEMAS.PROJECTS);
        await queryRunner.createSchema(SCHEMAS.LANGUAGES);
        await queryRunner.createSchema(SCHEMAS.TRANSLATIONS);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema(SCHEMAS.USERS);
        await queryRunner.dropSchema(SCHEMAS.PROJECTS);
        await queryRunner.dropSchema(SCHEMAS.LANGUAGES);
        await queryRunner.dropSchema(SCHEMAS.TRANSLATIONS);
    }

}
