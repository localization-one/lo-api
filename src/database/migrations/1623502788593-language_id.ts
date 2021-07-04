import {MigrationInterface, QueryRunner} from "typeorm";

export class languageId1623502788593 implements MigrationInterface {
    name = 'languageId1623502788593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP CONSTRAINT "FK_69ca724be77f53b341599b30f98"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP COLUMN "languageId"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD "language_id" uuid`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD "project_props_id" uuid`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD CONSTRAINT "FK_65c16ccc57ce0fd65e1821e8fa4" FOREIGN KEY ("language_id") REFERENCES "languages"."languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD CONSTRAINT "FK_25f5e0511f07b643119e065e597" FOREIGN KEY ("project_props_id") REFERENCES "projects"."project-properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP CONSTRAINT "FK_25f5e0511f07b643119e065e597"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP CONSTRAINT "FK_65c16ccc57ce0fd65e1821e8fa4"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP COLUMN "project_props_id"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" DROP COLUMN "language_id"`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD "languageId" uuid`);
        await queryRunner.query(`ALTER TABLE "languages"."language-configurations" ADD CONSTRAINT "FK_69ca724be77f53b341599b30f98" FOREIGN KEY ("languageId") REFERENCES "languages"."languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
