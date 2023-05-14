import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683925866941 implements MigrationInterface {
    name = 'default1683925866941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "icone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "icone"`);
    }

}
