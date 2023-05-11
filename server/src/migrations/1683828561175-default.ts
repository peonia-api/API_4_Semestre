import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683828561175 implements MigrationInterface {
    name = 'default1683828561175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groupToUser" ("id" SERIAL NOT NULL, "groupId" integer, "userId" integer, CONSTRAINT "PK_c51cbd1f85a2212a91bf0375cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "groupType" character varying(80) NOT NULL, "groupName" character varying(80) NOT NULL, "groupDescription" character varying(100) NOT NULL, "cliente" character varying, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groupToCall" ("id" SERIAL NOT NULL, "groupId" integer, "callId" integer, CONSTRAINT "PK_7dc28f0ab55c0663af7455094a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groupToUser" ADD CONSTRAINT "FK_7c81593b1dbbe75399160a2e5e3" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToUser" ADD CONSTRAINT "FK_71834ba4006e1ca8151e3b46cd3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToCall" ADD CONSTRAINT "FK_e76edc5081ce70130a5174ec516" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groupToCall" ADD CONSTRAINT "FK_65809cf0e12b4066a2aef9a56c2" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groupToCall" DROP CONSTRAINT "FK_65809cf0e12b4066a2aef9a56c2"`);
        await queryRunner.query(`ALTER TABLE "groupToCall" DROP CONSTRAINT "FK_e76edc5081ce70130a5174ec516"`);
        await queryRunner.query(`ALTER TABLE "groupToUser" DROP CONSTRAINT "FK_71834ba4006e1ca8151e3b46cd3"`);
        await queryRunner.query(`ALTER TABLE "groupToUser" DROP CONSTRAINT "FK_7c81593b1dbbe75399160a2e5e3"`);
        await queryRunner.query(`DROP TABLE "groupToCall"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "groupToUser"`);
    }

}
