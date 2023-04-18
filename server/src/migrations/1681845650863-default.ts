import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681845650863 implements MigrationInterface {
    name = 'default1681845650863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_b4b37dbf8d7e15b3dd90feb8b73\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_e168191d36a5442376c093b40c0\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1d770f014b76f7cfb58089dafc\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`groupId\` \`userGroup\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`committeeId\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD \`callId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`callEmail\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`userGroup\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`userGroup\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD CONSTRAINT \`FK_8727de707cf368e3a2c95143bf5\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`committee\` DROP FOREIGN KEY \`FK_8727de707cf368e3a2c95143bf5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`userGroup\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`userGroup\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`callEmail\``);
        await queryRunner.query(`ALTER TABLE \`committee\` DROP COLUMN \`callId\``);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`committeeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`userGroup\` \`groupId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1d770f014b76f7cfb58089dafc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_e168191d36a5442376c093b40c0\` FOREIGN KEY (\`committeeId\`) REFERENCES \`committee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_b4b37dbf8d7e15b3dd90feb8b73\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
