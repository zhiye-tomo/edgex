import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticles1646636998956 implements MigrationInterface {
    name = 'createArticles1646636998956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`articles_users_users\` (\`articlesId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_8561728ec68fcc04d596a0d283\` (\`articlesId\`), INDEX \`IDX_601af786e80a9f038c2ed11959\` (\`usersId\`), PRIMARY KEY (\`articlesId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`articles_users_users\` ADD CONSTRAINT \`FK_8561728ec68fcc04d596a0d2833\` FOREIGN KEY (\`articlesId\`) REFERENCES \`articles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`articles_users_users\` ADD CONSTRAINT \`FK_601af786e80a9f038c2ed119590\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles_users_users\` DROP FOREIGN KEY \`FK_601af786e80a9f038c2ed119590\``);
        await queryRunner.query(`ALTER TABLE \`articles_users_users\` DROP FOREIGN KEY \`FK_8561728ec68fcc04d596a0d2833\``);
        await queryRunner.query(`DROP INDEX \`IDX_601af786e80a9f038c2ed11959\` ON \`articles_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_8561728ec68fcc04d596a0d283\` ON \`articles_users_users\``);
        await queryRunner.query(`DROP TABLE \`articles_users_users\``);
        await queryRunner.query(`DROP TABLE \`articles\``);
    }

}
