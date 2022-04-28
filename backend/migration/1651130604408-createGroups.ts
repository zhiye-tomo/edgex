import {MigrationInterface, QueryRunner} from "typeorm";

export class createGroups1651130604408 implements MigrationInterface {
    name = 'createGroups1651130604408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``);
        await queryRunner.query(`CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`author_id\` int NULL, \`editor_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_6515da4dff8db423ce4eb841490\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_c45201de74c06c9f8ca0a26c71d\` FOREIGN KEY (\`editor_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_c45201de74c06c9f8ca0a26c71d\``);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_6515da4dff8db423ce4eb841490\``);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP INDEX \`IDX_d90243459a697eadb8ad56e909\``);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\``);
        await queryRunner.query(`DROP TABLE \`groups\``);
        await queryRunner.query(`DROP TABLE \`articles\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\` (\`name\`)`);
    }

}
