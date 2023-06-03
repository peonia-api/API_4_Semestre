import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685800442103 implements MigrationInterface {
    name = 'default1685800442103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "taskStatus" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "taskDescription" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "taskUserResponsible" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "call" ALTER COLUMN "callDateCreate" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call" ALTER COLUMN "callDateCreate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "taskUserResponsible" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "taskDescription" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "taskStatus" SET NOT NULL`);
    }

}
