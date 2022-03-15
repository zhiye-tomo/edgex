import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticles1646902889583 implements MigrationInterface {
    name = 'createArticles1646902889583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`userId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`userId\` int NOT NULL`);
    }

}
