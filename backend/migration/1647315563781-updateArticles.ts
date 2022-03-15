import {MigrationInterface, QueryRunner} from "typeorm";

export class updateArticles1647315563781 implements MigrationInterface {
    name = 'updateArticles1647315563781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`author\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`author\``);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`userId\``);
    }

}
