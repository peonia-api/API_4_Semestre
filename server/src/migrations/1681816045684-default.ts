import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681816045684 implements MigrationInterface {
    name = 'default1681816045684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`committee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comiImpactCto\` int NOT NULL, \`comiImpactHp\` int NOT NULL, \`comiCostSquad\` int NOT NULL, \`comiRiskRt\` int NOT NULL, \`comiRiskCso\` int NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callEmail\` varchar(255) NOT NULL, \`callType\` varchar(8) NOT NULL, \`callTitle\` varchar(80) NOT NULL, \`callDescription\` varchar(255) NOT NULL, \`callPriority\` varchar(10) NOT NULL, \`callDateCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`src\` varchar(255) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userPosition\` varchar(20) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(8) NOT NULL, \`userGroup\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`committee\` ADD CONSTRAINT \`FK_8727de707cf368e3a2c95143bf5\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_073267addab001d79d8cd20002a\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_073267addab001d79d8cd20002a\``);
        await queryRunner.query(`ALTER TABLE \`committee\` DROP FOREIGN KEY \`FK_8727de707cf368e3a2c95143bf5\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
        await queryRunner.query(`DROP TABLE \`call\``);
        await queryRunner.query(`DROP TABLE \`committee\``);
    }

}
