import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685382348740 implements MigrationInterface {
    name = 'default1685382348740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "taskStatus" character varying(30) NOT NULL, "taskDescription" character varying(100) NOT NULL, "taskUserResponsible" character varying(80) NOT NULL, "callId" integer, "groupId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_008966c29c1e9d4ec760dc7e81c" FOREIGN KEY ("callId") REFERENCES "call"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b8e1728a46f2cbb7b937011ae4f" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b8e1728a46f2cbb7b937011ae4f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_008966c29c1e9d4ec760dc7e81c"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
