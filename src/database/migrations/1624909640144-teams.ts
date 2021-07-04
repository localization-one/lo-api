import {MigrationInterface, QueryRunner} from "typeorm";

export class teams1624909640144 implements MigrationInterface {
    name = 'teams1624909640144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects"."team-roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "team_id" uuid, CONSTRAINT "PK_2850102b38e65d2d765c17c424a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2850102b38e65d2d765c17c424" ON "projects"."team-roles" ("id") `);
        await queryRunner.query(`CREATE TABLE "projects"."teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "project_id" uuid, CONSTRAINT "PK_02123e5ac4b2eac1d6630e2f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_02123e5ac4b2eac1d6630e2f69" ON "projects"."teams" ("id") `);
        await queryRunner.query(`ALTER TABLE "projects"."team-roles" ADD CONSTRAINT "FK_011438a5e28467c48d5e7f97b92" FOREIGN KEY ("team_id") REFERENCES "projects"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects"."teams" ADD CONSTRAINT "FK_345bb5ab56092f123549191a376" FOREIGN KEY ("project_id") REFERENCES "projects"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects"."teams" DROP CONSTRAINT "FK_345bb5ab56092f123549191a376"`);
        await queryRunner.query(`ALTER TABLE "projects"."team-roles" DROP CONSTRAINT "FK_011438a5e28467c48d5e7f97b92"`);
        await queryRunner.query(`DROP INDEX "projects"."IDX_02123e5ac4b2eac1d6630e2f69"`);
        await queryRunner.query(`DROP TABLE "projects"."teams"`);
        await queryRunner.query(`DROP INDEX "projects"."IDX_2850102b38e65d2d765c17c424"`);
        await queryRunner.query(`DROP TABLE "projects"."team-roles"`);
    }

}
