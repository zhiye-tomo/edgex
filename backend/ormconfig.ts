import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const options: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'mysql',
  username: 'user',
  password: 'password',
  database: 'develop',
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/migration/**/*.migration.js'],
  cli: {
    migrationsDir: 'migration',
  },
};

module.exports = options;
