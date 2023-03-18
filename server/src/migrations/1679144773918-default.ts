import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679144773918 implements MigrationInterface {
    name = 'default1679144773918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userName" character varying(100) NOT NULL, "userEmail" character varying(70) NOT NULL, "userPassword" character varying(100) NOT NULL, "userType" character varying(1) NOT NULL, CONSTRAINT "UQ_9047b2d58f91586f14f0cf44a45" UNIQUE ("userEmail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotfix" ("id" SERIAL NOT NULL, "hotfixState" character varying(15) NOT NULL, "hotfixPriority" character varying(6) NOT NULL, "callId" integer, CONSTRAINT "PK_213cdd54bcca1d0afdde1c5d46c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature" ("id" SERIAL NOT NULL, "featureState" character varying(15) NOT NULL, "featurePriority" character varying(6) NOT NULL, "callId" integer, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "call" ("id" SERIAL NOT NULL, "callType" character varying(4) NOT NULL, "callDescription" character varying(250) NOT NULL, "callAttachments" integer, "userId" integer, CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "arquivo" ("id" SERIAL NOT NULL, "arquivoType" character varying(4) NOT NULL, "featureState" character varying(15) NOT NULL, "callId" integer, CONSTRAINT "PK_956a4593ecc7963784e642c1b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hotfix" ADD CONSTRAINT "FK_0eb0c8bbe4e4caf9298f9aa0f9a" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feature" ADD CONSTRAINT "FK_2c6dcc6422eda629f54babfa258" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call" ADD CONSTRAINT "FK_b4b37dbf8d7e15b3dd90feb8b73" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "arquivo" ADD CONSTRAINT "FK_d4b6c45028412360f2df27721ea" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "arquivo" DROP CONSTRAINT "FK_d4b6c45028412360f2df27721ea"`);
        await queryRunner.query(`ALTER TABLE "call" DROP CONSTRAINT "FK_b4b37dbf8d7e15b3dd90feb8b73"`);
        await queryRunner.query(`ALTER TABLE "feature" DROP CONSTRAINT "FK_2c6dcc6422eda629f54babfa258"`);
        await queryRunner.query(`ALTER TABLE "hotfix" DROP CONSTRAINT "FK_0eb0c8bbe4e4caf9298f9aa0f9a"`);
        await queryRunner.query(`DROP TABLE "arquivo"`);
        await queryRunner.query(`DROP TABLE "call"`);
        await queryRunner.query(`DROP TABLE "feature"`);
        await queryRunner.query(`DROP TABLE "hotfix"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
