import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680014243366 implements MigrationInterface {
    name = 'default1680014243366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`development\` (\`id\` int NOT NULL AUTO_INCREMENT, \`devPriority\` int NOT NULL, \`devResponsible\` varchar(30) NOT NULL, \`devState\` varchar(15) NOT NULL, \`devType\` varchar(10) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`committee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comiName\` varchar(20) NOT NULL, \`groupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`historic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`histState\` varchar(15) NOT NULL, \`callFinishedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callType\` varchar(8) NOT NULL, \`callTitle\` varchar(80) NOT NULL, \`callDescription\` varchar(250) NOT NULL, \`callAttachments\` int NULL, \`callDateCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`callProduct\` varchar(40) NOT NULL, \`callGroup\` varchar(255) NULL, \`committeeId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(8) NOT NULL, \`groupId\` int NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupName\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`development\` ADD CONSTRAINT \`FK_85550171f06fcb7a3c9816e9222\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD CONSTRAINT \`FK_70582d9f93a770975cb49a66913\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historic\` ADD CONSTRAINT \`FK_4df36c96abe62e0efba49f2d743\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_e168191d36a5442376c093b40c0\` FOREIGN KEY (\`committeeId\`) REFERENCES \`committee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_b4b37dbf8d7e15b3dd90feb8b73\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1d770f014b76f7cfb58089dafc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1d770f014b76f7cfb58089dafc\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_b4b37dbf8d7e15b3dd90feb8b73\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_e168191d36a5442376c093b40c0\``);
        await queryRunner.query(`ALTER TABLE \`historic\` DROP FOREIGN KEY \`FK_4df36c96abe62e0efba49f2d743\``);
        await queryRunner.query(`ALTER TABLE \`committee\` DROP FOREIGN KEY \`FK_70582d9f93a770975cb49a66913\``);
        await queryRunner.query(`ALTER TABLE \`development\` DROP FOREIGN KEY \`FK_85550171f06fcb7a3c9816e9222\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`call\``);
        await queryRunner.query(`DROP TABLE \`historic\``);
        await queryRunner.query(`DROP TABLE \`committee\``);
        await queryRunner.query(`DROP TABLE \`development\``);
    }

}
