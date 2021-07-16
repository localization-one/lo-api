import {MigrationInterface, QueryRunner} from "typeorm";

export class email1625394061763 implements MigrationInterface {
    name = 'email1625394061763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."users" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users"."users" ADD CONSTRAINT "UQ_fe62a84d8ea7e438d0f322c0815" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."users" DROP CONSTRAINT "UQ_fe62a84d8ea7e438d0f322c0815"`);
        await queryRunner.query(`ALTER TABLE "users"."users" DROP COLUMN "email"`);
    }

}
