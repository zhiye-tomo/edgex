import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGroups1649651749557 implements MigrationInterface {
  name = 'createGroups1649651749557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`groups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`craeteAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_664ea405ae2a10c264d582ee56\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_664ea405ae2a10c264d582ee56\` ON \`groups\``,
    );
    await queryRunner.query(`DROP TABLE \`groups\``);
  }
}
