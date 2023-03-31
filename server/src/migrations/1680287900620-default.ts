import { MigrationInterface, QueryRunner } from "typeorm";

export class default1680287900620 implements MigrationInterface {
    name = 'default1680287900620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`call\` (\`id\` int NOT NULL AUTO_INCREMENT, \`callType\` varchar(8) NOT NULL, \`callTitle\` varchar(80) NOT NULL, \`callDescription\` varchar(255) NOT NULL, \`callPriority\` varchar(10) NOT NULL, \`callState\` varchar(20) NOT NULL, \`callRequester\` varchar(40) NOT NULL, \`callTeam\` varchar(50) NOT NULL, \`callDateCreate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`callEmail\` varchar(70) NOT NULL, \`callPhone\` varchar(15) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`call\``);
    }

}
