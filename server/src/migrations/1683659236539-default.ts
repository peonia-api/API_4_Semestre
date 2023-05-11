import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683659236539 implements MigrationInterface {
    name = 'default1683659236539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "committee" ("id" integer NOT NULL, "comiImpactCto" integer, "comiImpactCtoAvaliation" character varying, "comiImpactHp" integer, "comiImpactoHpAvaliation" character varying, "comiRiskRt" integer, "comiRiskRtAvaliation" character varying, "comiRiskCso" integer, "comiRiskCsoAvaliation" character varying, "callId" integer, CONSTRAINT "PK_29569bbabae77e56711f2310563" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groupToCall" ("id" SERIAL NOT NULL, "groupId" integer, "callId" integer, CONSTRAINT "PK_7dc28f0ab55c0663af7455094a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "call" ("id" SERIAL NOT NULL, "callEmail" character varying NOT NULL, "callType" character varying(8) NOT NULL, "callTitle" character varying(80) NOT NULL, "callDescription" character varying NOT NULL, "callPriority" character varying(10) NOT NULL, "callStatus" character varying, "callDateCreate" TIMESTAMP NOT NULL DEFAULT now(), "callDateFinalization" TIMESTAMP NOT NULL DEFAULT now(), "avaliar" character varying, CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "src" character varying NOT NULL, "callId" integer, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groupToUser" DROP COLUMN "cliente"`);
        await queryRunner.query(`ALTER TABLE "committee" ADD CONSTRAINT "FK_8727de707cf368e3a2c95143bf5" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToCall" ADD CONSTRAINT "FK_e76edc5081ce70130a5174ec516" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToCall" ADD CONSTRAINT "FK_65809cf0e12b4066a2aef9a56c2" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_073267addab001d79d8cd20002a" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_073267addab001d79d8cd20002a"`);
        await queryRunner.query(`ALTER TABLE "groupToCall" DROP CONSTRAINT "FK_65809cf0e12b4066a2aef9a56c2"`);
        await queryRunner.query(`ALTER TABLE "groupToCall" DROP CONSTRAINT "FK_e76edc5081ce70130a5174ec516"`);
        await queryRunner.query(`ALTER TABLE "committee" DROP CONSTRAINT "FK_8727de707cf368e3a2c95143bf5"`);
        await queryRunner.query(`ALTER TABLE "groupToUser" ADD "cliente" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "attachment"`);
        await queryRunner.query(`DROP TABLE "call"`);
        await queryRunner.query(`DROP TABLE "groupToCall"`);
        await queryRunner.query(`DROP TABLE "committee"`);
    }

}
