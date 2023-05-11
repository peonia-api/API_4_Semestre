import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683744645340 implements MigrationInterface {
    name = 'default1683744645340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call" ALTER COLUMN "callPriority" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call" ALTER COLUMN "callPriority" SET NOT NULL`);
    }

}
