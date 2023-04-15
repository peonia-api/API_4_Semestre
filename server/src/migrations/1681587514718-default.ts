import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681587514718 implements MigrationInterface {
    name = 'default1681587514718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(8) NOT NULL, \`groupId\` int NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`groupName\` varchar(20) NOT NULL, \`committeeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`committee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comiImpactCto\` int NOT NULL, \`comiImpactHp\` int NOT NULL, \`comiCostSquad\` int NOT NULL, \`comiRiskRt\` int NOT NULL, \`comiRiskCso\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callType\` varchar(8) NOT NULL, \`callTitle\` varchar(80) NOT NULL, \`callDescription\` varchar(255) NOT NULL, \`callPriority\` varchar(10) NOT NULL, \`callDateCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`committeeId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`src\` varchar(255) NOT NULL, \`callId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_user_users\` (\`groupId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_14428598367657b77b70207894\` (\`groupId\`), INDEX \`IDX_bc40ca353e816c2942be0811b8\` (\`usersId\`), PRIMARY KEY (\`groupId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1d770f014b76f7cfb58089dafc\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD CONSTRAINT \`FK_aca31e6318091537b30cafa4869\` FOREIGN KEY (\`committeeId\`) REFERENCES \`committee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_e168191d36a5442376c093b40c0\` FOREIGN KEY (\`committeeId\`) REFERENCES \`committee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`call\` ADD CONSTRAINT \`FK_b4b37dbf8d7e15b3dd90feb8b73\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_073267addab001d79d8cd20002a\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_user_users\` ADD CONSTRAINT \`FK_14428598367657b77b70207894c\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`group_user_users\` ADD CONSTRAINT \`FK_bc40ca353e816c2942be0811b88\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_user_users\` DROP FOREIGN KEY \`FK_bc40ca353e816c2942be0811b88\``);
        await queryRunner.query(`ALTER TABLE \`group_user_users\` DROP FOREIGN KEY \`FK_14428598367657b77b70207894c\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_073267addab001d79d8cd20002a\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_b4b37dbf8d7e15b3dd90feb8b73\``);
        await queryRunner.query(`ALTER TABLE \`call\` DROP FOREIGN KEY \`FK_e168191d36a5442376c093b40c0\``);
        await queryRunner.query(`ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_aca31e6318091537b30cafa4869\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1d770f014b76f7cfb58089dafc\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc40ca353e816c2942be0811b8\` ON \`group_user_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_14428598367657b77b70207894\` ON \`group_user_users\``);
        await queryRunner.query(`DROP TABLE \`group_user_users\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
        await queryRunner.query(`DROP TABLE \`call\``);
        await queryRunner.query(`DROP TABLE \`committee\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
