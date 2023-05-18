import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684440714041 implements MigrationInterface {
    name = 'default1684440714041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_073267addab001d79d8cd20002a\``);
        await queryRunner.query(`ALTER TABLE \`call\` CHANGE \`HpDescription\` \`HpDescription\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_073267addab001d79d8cd20002a\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_073267addab001d79d8cd20002a\``);
        await queryRunner.query(`ALTER TABLE \`call\` CHANGE \`HpDescription\` \`HpDescription\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_073267addab001d79d8cd20002a\` FOREIGN KEY (\`callId\`) REFERENCES \`call\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
