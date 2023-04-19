import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681855783483 implements MigrationInterface {
    name = 'default1681855783483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiImpactCto\` \`comiImpactCto\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiImpactHp\` \`comiImpactHp\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiCostSquad\` \`comiCostSquad\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiRiskRt\` \`comiRiskRt\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiRiskCso\` \`comiRiskCso\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiRiskCso\` \`comiRiskCso\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiRiskRt\` \`comiRiskRt\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiCostSquad\` \`comiCostSquad\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiImpactHp\` \`comiImpactHp\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`committee\` CHANGE \`comiImpactCto\` \`comiImpactCto\` int NOT NULL`);
    }

}
