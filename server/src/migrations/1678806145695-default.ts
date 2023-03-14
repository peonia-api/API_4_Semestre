import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678806145695 implements MigrationInterface {
    name = 'default1678806145695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(100) NOT NULL, \`userEmail\` varchar(70) NOT NULL, \`userPassword\` varchar(100) NOT NULL, \`userType\` varchar(1) NOT NULL, UNIQUE INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` (\`userEmail\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9047b2d58f91586f14f0cf44a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
