import {MigrationInterface, QueryRunner} from "typeorm";

export class properties1623505195369 implements MigrationInterface {
    name = 'properties1623505195369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects"."projects" DROP CONSTRAINT "FK_1121b6d70aae7ffa687b7636bcf"`);
        await queryRunner.query(`ALTER TABLE "projects"."projects" DROP CONSTRAINT "REL_1121b6d70aae7ffa687b7636bc"`);
        await queryRunner.query(`ALTER TABLE "projects"."projects" DROP COLUMN "props_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects"."projects" ADD "props_id" uuid`);
        await queryRunner.query(`ALTER TABLE "projects"."projects" ADD CONSTRAINT "REL_1121b6d70aae7ffa687b7636bc" UNIQUE ("props_id")`);
        await queryRunner.query(`ALTER TABLE "projects"."projects" ADD CONSTRAINT "FK_1121b6d70aae7ffa687b7636bcf" FOREIGN KEY ("props_id") REFERENCES "projects"."project-properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
