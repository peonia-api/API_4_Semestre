import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682088174528 implements MigrationInterface {
    name = 'default1682088174528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "committee" ("id" SERIAL NOT NULL, "comiImpactCto" integer, "comiImpactHp" integer, "comiCostSquad" integer, "comiRiskRt" integer, "comiRiskCso" integer, "callId" integer, CONSTRAINT "PK_29569bbabae77e56711f2310563" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "call" ("id" SERIAL NOT NULL, "callEmail" character varying NOT NULL, "callType" character varying(8) NOT NULL, "callTitle" character varying(80) NOT NULL, "callDescription" character varying NOT NULL, "callPriority" character varying(10) NOT NULL, "callDateCreate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "src" character varying NOT NULL, "callId" integer, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying(100) NOT NULL, "userPosition" character varying(25) NOT NULL, "userEmail" character varying(70) NOT NULL, "userPassword" character varying(100) NOT NULL, "userType" character varying(70) NOT NULL, CONSTRAINT "UQ_9047b2d58f91586f14f0cf44a45" UNIQUE ("userEmail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "committee" ADD CONSTRAINT "FK_8727de707cf368e3a2c95143bf5" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_073267addab001d79d8cd20002a" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_073267addab001d79d8cd20002a"`);
        await queryRunner.query(`ALTER TABLE "committee" DROP CONSTRAINT "FK_8727de707cf368e3a2c95143bf5"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
        await queryRunner.query(`DROP TABLE "call"`);
        await queryRunner.query(`DROP TABLE "committee"`);
    }

}
