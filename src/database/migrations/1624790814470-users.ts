import {MigrationInterface, QueryRunner} from "typeorm";

export class users1624790814470 implements MigrationInterface {
    name = 'users1624790814470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users"."roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "name" text NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_1d8dd7ffa37c3ab0c4eefb0b221" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1d8dd7ffa37c3ab0c4eefb0b22" ON "users"."roles" ("id") `);
        await queryRunner.query(`CREATE TABLE "users"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_bf37f721367dad55e75b5730b08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bf37f721367dad55e75b5730b0" ON "users"."users" ("id") `);
        await queryRunner.query(`CREATE TABLE "users"."user-details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "mobilePhoneVerified" boolean NOT NULL DEFAULT false, "user_id" uuid, CONSTRAINT "REL_d124a40c3cc3ce28a25afce8d4" UNIQUE ("user_id"), CONSTRAINT "PK_96e6f155b066b1b2b4f50261ead" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_96e6f155b066b1b2b4f50261ea" ON "users"."user-details" ("id") `);
        await queryRunner.query(`CREATE TABLE "users"."user-preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "emailNotificationsEnabled" boolean NOT NULL DEFAULT false, "smsNotificationsEnabled" boolean NOT NULL DEFAULT false, "user_id" uuid, CONSTRAINT "REL_e8e74f268568087acf002011c5" UNIQUE ("user_id"), CONSTRAINT "PK_1e4842a3e6a36da73431b6131dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1e4842a3e6a36da73431b6131d" ON "users"."user-preferences" ("id") `);
        await queryRunner.query(`CREATE TABLE "users"."users-x-roles" ("role_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7691b21cf24086f07e9d3642d84" PRIMARY KEY ("role_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_749980d649f57d02c6917ad963" ON "users"."users-x-roles" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dee5afa0daddfc19af631bfa30" ON "users"."users-x-roles" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users"."user-details" ADD CONSTRAINT "FK_d124a40c3cc3ce28a25afce8d43" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users"."user-preferences" ADD CONSTRAINT "FK_e8e74f268568087acf002011c53" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users"."users-x-roles" ADD CONSTRAINT "FK_749980d649f57d02c6917ad9638" FOREIGN KEY ("role_id") REFERENCES "users"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users"."users-x-roles" ADD CONSTRAINT "FK_dee5afa0daddfc19af631bfa304" FOREIGN KEY ("user_id") REFERENCES "users"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."users-x-roles" DROP CONSTRAINT "FK_dee5afa0daddfc19af631bfa304"`);
        await queryRunner.query(`ALTER TABLE "users"."users-x-roles" DROP CONSTRAINT "FK_749980d649f57d02c6917ad9638"`);
        await queryRunner.query(`ALTER TABLE "users"."user-preferences" DROP CONSTRAINT "FK_e8e74f268568087acf002011c53"`);
        await queryRunner.query(`ALTER TABLE "users"."user-details" DROP CONSTRAINT "FK_d124a40c3cc3ce28a25afce8d43"`);
        await queryRunner.query(`DROP INDEX "users"."IDX_dee5afa0daddfc19af631bfa30"`);
        await queryRunner.query(`DROP INDEX "users"."IDX_749980d649f57d02c6917ad963"`);
        await queryRunner.query(`DROP TABLE "users"."users-x-roles"`);
        await queryRunner.query(`DROP INDEX "users"."IDX_1e4842a3e6a36da73431b6131d"`);
        await queryRunner.query(`DROP TABLE "users"."user-preferences"`);
        await queryRunner.query(`DROP INDEX "users"."IDX_96e6f155b066b1b2b4f50261ea"`);
        await queryRunner.query(`DROP TABLE "users"."user-details"`);
        await queryRunner.query(`DROP INDEX "users"."IDX_bf37f721367dad55e75b5730b0"`);
        await queryRunner.query(`DROP TABLE "users"."users"`);
        await queryRunner.query(`DROP INDEX "users"."IDX_1d8dd7ffa37c3ab0c4eefb0b22"`);
        await queryRunner.query(`DROP TABLE "users"."roles"`);
    }

}
