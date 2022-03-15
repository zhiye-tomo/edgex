import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticles1646811253703 implements MigrationInterface {
    name = 'createArticles1646811253703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`userId\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`userId\``);
    }

}
