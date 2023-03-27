import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679164350218 implements MigrationInterface {
    name = 'default1679164350218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupName\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(1) NOT NULL, \`groupId\` int NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`deniedArchive\` (\`id\` int NOT NULL AUTO_INCREMENT, \`archiveType\` varchar(4) NOT NULL, \`archiveState\` varchar(15) NOT NULL, \`callFinishedDate\` date NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`archive\` (\`id\` int NOT NULL AUTO_INCREMENT, \`archiveType\` varchar(4) NOT NULL, \`featureState\` varchar(15) NOT NULL, \`developmentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`development\` (\`id\` int NOT NULL AUTO_INCREMENT, \`devPriority\` int NOT NULL, \`devResponsible\` varchar(30) NOT NULL, \`devState\` varchar(15) NOT NULL, \`devType\` varchar(10) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callType\` varchar(4) NOT NULL, \`callTitle\` varchar(80) NOT NULL, \`callDescription\` varchar(250) NOT NULL, \`callAttachments\` int NULL, \`callDateCreate\` date NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1d770f014b76f7cfb58089dafc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`deniedArchive\` ADD CONSTRAINT \`FK_124b25275566ee81afb968cb94c\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`archive\` ADD CONSTRAINT \`FK_d46bd9908b581e3adf6b2fdf861\` FOREIGN KEY (\`developmentId\`) REFERENCES \`development\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`development\` ADD CONSTRAINT \`FK_85550171f06fcb7a3c9816e9222\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_b4b37dbf8d7e15b3dd90feb8b73\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_b4b37dbf8d7e15b3dd90feb8b73\``);
        await queryRunner.query(`ALTER TABLE \`development\` DROP FOREIGN KEY \`FK_85550171f06fcb7a3c9816e9222\``);
        await queryRunner.query(`ALTER TABLE \`archive\` DROP FOREIGN KEY \`FK_d46bd9908b581e3adf6b2fdf861\``);
        await queryRunner.query(`ALTER TABLE \`deniedArchive\` DROP FOREIGN KEY \`FK_124b25275566ee81afb968cb94c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1d770f014b76f7cfb58089dafc\``);
        await queryRunner.query(`DROP TABLE \`call\``);
        await queryRunner.query(`DROP TABLE \`development\``);
        await queryRunner.query(`DROP TABLE \`archive\``);
        await queryRunner.query(`DROP TABLE \`deniedArchive\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`group\``);
    }

}
