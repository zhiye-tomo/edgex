import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsers1645622076196 implements MigrationInterface {
    name = 'createUsers1645622076196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
    }

}
