import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683144277944 implements MigrationInterface {
    name = 'default1683144277944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`committee\` (\`id\` int NOT NULL, \`comiImpactCto\` int NULL, \`comiImpactCtoAvaliation\` varchar(255) NULL, \`comiImpactHp\` int NULL, \`comiImpactoHpAvaliation\` varchar(255) NULL, \`comiRiskRt\` int NULL, \`comiRiskRtAvaliation\` varchar(255) NULL, \`comiRiskCso\` int NULL, \`comiRiskCsoAvaliation\` varchar(255) NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userPosition\` varchar(25) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(70) NOT NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groupToUser\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupType\` varchar(80) NOT NULL, \`groupDescription\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groupToCall\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupId\` int NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callEmail\` varchar(255) NOT NULL, \`callType\` varchar(8) NOT NULL, \`callTitle\` varchar(80) NOT NULL, \`callDescription\` varchar(255) NOT NULL, \`callPriority\` varchar(10) NOT NULL, \`callStatus\` varchar(255) NULL, \`callDateCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`src\` varchar(255) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD CONSTRAINT \`FK_8727de707cf368e3a2c95143bf5\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`groupToUser\` ADD CONSTRAINT \`FK_7c81593b1dbbe75399160a2e5e3\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`groupToUser\` ADD CONSTRAINT \`FK_71834ba4006e1ca8151e3b46cd3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`groupToCall\` ADD CONSTRAINT \`FK_e76edc5081ce70130a5174ec516\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`groupToCall\` ADD CONSTRAINT \`FK_65809cf0e12b4066a2aef9a56c2\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_073267addab001d79d8cd20002a\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_073267addab001d79d8cd20002a\``);
        await queryRunner.query(`ALTER TABLE \`groupToCall\` DROP FOREIGN KEY \`FK_65809cf0e12b4066a2aef9a56c2\``);
        await queryRunner.query(`ALTER TABLE \`groupToCall\` DROP FOREIGN KEY \`FK_e76edc5081ce70130a5174ec516\``);
        await queryRunner.query(`ALTER TABLE \`groupToUser\` DROP FOREIGN KEY \`FK_71834ba4006e1ca8151e3b46cd3\``);
        await queryRunner.query(`ALTER TABLE \`groupToUser\` DROP FOREIGN KEY \`FK_7c81593b1dbbe75399160a2e5e3\``);
        await queryRunner.query(`ALTER TABLE \`committee\` DROP FOREIGN KEY \`FK_8727de707cf368e3a2c95143bf5\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
        await queryRunner.query(`DROP TABLE \`call\``);
        await queryRunner.query(`DROP TABLE \`groupToCall\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP TABLE \`groupToUser\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`committee\``);
    }

}
