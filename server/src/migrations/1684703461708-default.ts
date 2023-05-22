import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684703461708 implements MigrationInterface {
    name = 'default1684703461708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ADD "groupEmail" character varying(80) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "groupEmail"`);
    }

}
