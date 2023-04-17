import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681758504117 implements MigrationInterface {
    name = 'default1681758504117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`committee\` DROP FOREIGN KEY \`FK_60acf578cb381f48159167e1d71\``);
        await queryRunner.query(`ALTER TABLE \`committee\` DROP COLUMN \`committeeId\``);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`committeeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_e168191d36a5442376c093b40c0\` FOREIGN KEY (\`committeeId\`) REFERENCES \`committee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_e168191d36a5442376c093b40c0\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`committeeId\``);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD \`committeeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD CONSTRAINT \`FK_60acf578cb381f48159167e1d71\` FOREIGN KEY (\`committeeId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
