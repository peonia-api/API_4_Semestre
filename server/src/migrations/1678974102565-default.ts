import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678974102565 implements MigrationInterface {
    name = 'default1678974102565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(1) NOT NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hotfix\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hotfixState\` varchar(15) NOT NULL, \`hotfixPriority\` varchar(6) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`arquivo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`arquivoType\` varchar(4) NOT NULL, \`featureState\` varchar(15) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callType\` varchar(4) NOT NULL, \`callDescription\` varchar(250) NOT NULL, \`callAttachments\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`featureState\` varchar(15) NOT NULL, \`featurePriority\` varchar(6) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hotfix\` ADD CONSTRAINT \`FK_0eb0c8bbe4e4caf9298f9aa0f9a\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`arquivo\` ADD CONSTRAINT \`FK_d4b6c45028412360f2df27721ea\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_b4b37dbf8d7e15b3dd90feb8b73\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`feature\` ADD CONSTRAINT \`FK_2c6dcc6422eda629f54babfa258\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`feature\` DROP FOREIGN KEY \`FK_2c6dcc6422eda629f54babfa258\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_b4b37dbf8d7e15b3dd90feb8b73\``);
        await queryRunner.query(`ALTER TABLE \`arquivo\` DROP FOREIGN KEY \`FK_d4b6c45028412360f2df27721ea\``);
        await queryRunner.query(`ALTER TABLE \`hotfix\` DROP FOREIGN KEY \`FK_0eb0c8bbe4e4caf9298f9aa0f9a\``);
        await queryRunner.query(`DROP TABLE \`feature\``);
        await queryRunner.query(`DROP TABLE \`call\``);
        await queryRunner.query(`DROP TABLE \`arquivo\``);
        await queryRunner.query(`DROP TABLE \`hotfix\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
