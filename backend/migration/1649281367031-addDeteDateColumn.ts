import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDeteDateColumn1649281367031 implements MigrationInterface {
  name = 'addDeteDateColumn1649281367031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tags\` DROP INDEX \`IDX_d90243459a697eadb8ad56e909\``,
    );
    await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\` (\`name\`)`,
    );
  }
}
