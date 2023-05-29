import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685382285958 implements MigrationInterface {
    name = 'default1685382285958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "committee" ("id" integer NOT NULL, "comiImpactCto" integer, "comiImpactCtoAvaliation" character varying, "comiImpactHp" integer, "comiImpactoHpAvaliation" character varying, "comiRiskRt" integer, "comiRiskRtAvaliation" character varying, "comiRiskCso" integer, "comiRiskCsoAvaliation" character varying, "callId" integer, CONSTRAINT "PK_29569bbabae77e56711f2310563" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groupToUser" ("id" SERIAL NOT NULL, "groupId" integer, "userId" integer, CONSTRAINT "PK_c51cbd1f85a2212a91bf0375cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kanban" ("id" SERIAL NOT NULL, "taskStatus" character varying(30) NOT NULL, "taskDescription" character varying(100) NOT NULL, "taskUserResponsible" character varying(80) NOT NULL, "callId" integer, "groupId" integer, CONSTRAINT "PK_b9548bc3609538e02ac6084c47e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "groupType" character varying(80) NOT NULL, "groupName" character varying(80) NOT NULL, "groupDescription" character varying(100) NOT NULL, "groupEmail" character varying(80) NOT NULL, "cliente" character varying, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groupToCall" ("id" SERIAL NOT NULL, "groupId" integer, "callId" integer, CONSTRAINT "PK_7dc28f0ab55c0663af7455094a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "call" ("id" SERIAL NOT NULL, "callEmail" character varying NOT NULL, "callType" character varying(8) NOT NULL, "callTitle" character varying(80) NOT NULL, "callDescription" character varying NOT NULL, "callPriority" character varying(10), "callStatus" character varying, "callDateCreate" TIMESTAMP NOT NULL DEFAULT now(), "callDateFinalization" TIMESTAMP NOT NULL DEFAULT now(), "HpDescription" character varying, "avaliar" character varying, CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "src" character varying NOT NULL, "callId" integer, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "committee" ADD CONSTRAINT "FK_8727de707cf368e3a2c95143bf5" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToUser" ADD CONSTRAINT "FK_7c81593b1dbbe75399160a2e5e3" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToUser" ADD CONSTRAINT "FK_71834ba4006e1ca8151e3b46cd3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kanban" ADD CONSTRAINT "FK_12ed4957b5f23182613ca853429" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kanban" ADD CONSTRAINT "FK_002ee3abcab4c6cbc5b17815364" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToCall" ADD CONSTRAINT "FK_e76edc5081ce70130a5174ec516" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToCall" ADD CONSTRAINT "FK_65809cf0e12b4066a2aef9a56c2" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_073267addab001d79d8cd20002a" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_073267addab001d79d8cd20002a"`);
        await queryRunner.query(`ALTER TABLE "groupToCall" DROP CONSTRAINT "FK_65809cf0e12b4066a2aef9a56c2"`);
        await queryRunner.query(`ALTER TABLE "groupToCall" DROP CONSTRAINT "FK_e76edc5081ce70130a5174ec516"`);
        await queryRunner.query(`ALTER TABLE "kanban" DROP CONSTRAINT "FK_002ee3abcab4c6cbc5b17815364"`);
        await queryRunner.query(`ALTER TABLE "kanban" DROP CONSTRAINT "FK_12ed4957b5f23182613ca853429"`);
        await queryRunner.query(`ALTER TABLE "groupToUser" DROP CONSTRAINT "FK_71834ba4006e1ca8151e3b46cd3"`);
        await queryRunner.query(`ALTER TABLE "groupToUser" DROP CONSTRAINT "FK_7c81593b1dbbe75399160a2e5e3"`);
        await queryRunner.query(`ALTER TABLE "committee" DROP CONSTRAINT "FK_8727de707cf368e3a2c95143bf5"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
        await queryRunner.query(`DROP TABLE "call"`);
        await queryRunner.query(`DROP TABLE "groupToCall"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "kanban"`);
        await queryRunner.query(`DROP TABLE "groupToUser"`);
        await queryRunner.query(`DROP TABLE "committee"`);
    }

}
