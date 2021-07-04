import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1622995774064 implements MigrationInterface {
    name = 'InitialTables1622995774064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages"."languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "alpha2" character varying(2) NOT NULL, "name" text NOT NULL, "nativeName" text NOT NULL, CONSTRAINT "PK_fa8513a5eba7eecb217a3da5e04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fa8513a5eba7eecb217a3da5e0" ON "languages"."languages" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f484c2590db68e7d5ce6e923f0" ON "languages"."languages" ("alpha2", "name") `);
        await queryRunner.query(`CREATE TABLE "languages"."language-configurations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "default" boolean NOT NULL DEFAULT false, "languageId" uuid, CONSTRAINT "PK_eb7ceae13f3060785267b16f78f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_eb7ceae13f3060785267b16f78" ON "languages"."language-configurations" ("id") `);
        await queryRunner.query(`CREATE TABLE "projects"."projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "name" text NOT NULL, "origin" text NOT NULL, "description" text, "props_id" uuid, CONSTRAINT "REL_1121b6d70aae7ffa687b7636bc" UNIQUE ("props_id"), CONSTRAINT "PK_4e29ca4bca219d2829f5a655255" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4e29ca4bca219d2829f5a65525" ON "projects"."projects" ("id") `);
        await queryRunner.query(`CREATE TABLE "projects"."project-properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "verified" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "project_id" uuid, CONSTRAINT "REL_fe58b151500cf0987b4daedecd" UNIQUE ("project_id"), CONSTRAINT "PK_30a0ca46833044da104be6c7f1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_30a0ca46833044da104be6c7f1" ON "projects"."project-properties" ("id") `);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD CONSTRAINT "FK_69ca724be77f53b341599b30f98" FOREIGN KEY ("languageId") REFERENCES "languages"."languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects"."projects" ADD CONSTRAINT "FK_1121b6d70aae7ffa687b7636bcf" FOREIGN KEY ("props_id") REFERENCES "projects"."project-properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects"."project-properties" ADD CONSTRAINT "FK_fe58b151500cf0987b4daedecde" FOREIGN KEY ("project_id") REFERENCES "projects"."projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects"."project-properties" DROP CONSTRAINT "FK_fe58b151500cf0987b4daedecde"`);
        await queryRunner.query(`ALTER TABLE "projects"."projects" DROP CONSTRAINT "FK_1121b6d70aae7ffa687b7636bcf"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP CONSTRAINT "FK_69ca724be77f53b341599b30f98"`);
        await queryRunner.query(`DROP INDEX "projects"."IDX_30a0ca46833044da104be6c7f1"`);
        await queryRunner.query(`DROP TABLE "projects"."project-properties"`);
        await queryRunner.query(`DROP INDEX "projects"."IDX_4e29ca4bca219d2829f5a65525"`);
        await queryRunner.query(`DROP TABLE "projects"."projects"`);
        await queryRunner.query(`DROP INDEX "languages"."IDX_eb7ceae13f3060785267b16f78"`);
        await queryRunner.query(`DROP TABLE "languages"."language-configurations"`);
        await queryRunner.query(`DROP INDEX "languages"."IDX_f484c2590db68e7d5ce6e923f0"`);
        await queryRunner.query(`DROP INDEX "languages"."IDX_fa8513a5eba7eecb217a3da5e0"`);
        await queryRunner.query(`DROP TABLE "languages"."languages"`);
    }

}
