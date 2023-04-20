import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682017059810 implements MigrationInterface {
    name = 'default1682017059810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` varchar(36) NOT NULL, \`mail\` varchar(70) NOT NULL, \`senha\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_76eb67a5fef70ccc191d6dc06c\` (\`mail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_76eb67a5fef70ccc191d6dc06c\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
