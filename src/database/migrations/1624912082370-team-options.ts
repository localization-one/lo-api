import {MigrationInterface, QueryRunner} from "typeorm";

export class teamOptions1624912082370 implements MigrationInterface {
    name = 'teamOptions1624912082370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects"."team-options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "team_id" uuid, CONSTRAINT "REL_0965de0854d270800b6d8d4b6f" UNIQUE ("team_id"), CONSTRAINT "PK_c858c02702ea79ad85d4449a3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c858c02702ea79ad85d4449a3e" ON "projects"."team-options" ("id") `);
        await queryRunner.query(`ALTER TABLE "projects"."teams" ADD "options_id" uuid`);
        await queryRunner.query(`ALTER TABLE "projects"."teams" ADD CONSTRAINT "UQ_a9992f10e5d53c77fd1fd6caf34" UNIQUE ("options_id")`);
        await queryRunner.query(`ALTER TABLE "projects"."team-options" ADD CONSTRAINT "FK_0965de0854d270800b6d8d4b6f0" FOREIGN KEY ("team_id") REFERENCES "projects"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects"."teams" ADD CONSTRAINT "FK_a9992f10e5d53c77fd1fd6caf34" FOREIGN KEY ("options_id") REFERENCES "projects"."team-options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects"."teams" DROP CONSTRAINT "FK_a9992f10e5d53c77fd1fd6caf34"`);
        await queryRunner.query(`ALTER TABLE "projects"."team-options" DROP CONSTRAINT "FK_0965de0854d270800b6d8d4b6f0"`);
        await queryRunner.query(`ALTER TABLE "projects"."teams" DROP CONSTRAINT "UQ_a9992f10e5d53c77fd1fd6caf34"`);
        await queryRunner.query(`ALTER TABLE "projects"."teams" DROP COLUMN "options_id"`);
        await queryRunner.query(`DROP INDEX "projects"."IDX_c858c02702ea79ad85d4449a3e"`);
        await queryRunner.query(`DROP TABLE "projects"."team-options"`);
    }

}
