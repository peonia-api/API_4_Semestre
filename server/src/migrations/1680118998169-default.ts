import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680118998169 implements MigrationInterface {
    name = 'default1680118998169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`committee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comiName\` varchar(20) NOT NULL, \`groupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`historic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`histState\` varchar(15) NOT NULL, \`callFinishedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`callProduct\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`callGroup\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD \`committeeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD CONSTRAINT \`FK_70582d9f93a770975cb49a66913\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historic\` ADD CONSTRAINT \`FK_4df36c96abe62e0efba49f2d743\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_e168191d36a5442376c093b40c0\` FOREIGN KEY (\`committeeId\`) REFERENCES \`committee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_e168191d36a5442376c093b40c0\``);
        await queryRunner.query(`ALTER TABLE \`historic\` DROP FOREIGN KEY \`FK_4df36c96abe62e0efba49f2d743\``);
        await queryRunner.query(`ALTER TABLE \`committee\` DROP FOREIGN KEY \`FK_70582d9f93a770975cb49a66913\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`committeeId\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`callGroup\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP COLUMN \`callProduct\``);
        await queryRunner.query(`DROP TABLE \`historic\``);
        await queryRunner.query(`DROP TABLE \`committee\``);
    }

}
