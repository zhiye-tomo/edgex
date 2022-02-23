import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsers1645451866914 implements MigrationInterface {
    name = 'createUsers1645451866914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`neko\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`neko\``);
    }

}
