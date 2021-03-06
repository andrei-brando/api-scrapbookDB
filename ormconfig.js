require('dotenv').config();

const rootPath = process.env.NODE_ENV?.toLocaleLowerCase() === 'production'
  ? 'dist'
  : 'src';

console.log(rootPath);

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    `${rootPath}/core/data/database/entities/**/*`,
  ],
  migrations: [
    `${rootPath}/core/data/database/migrations/**/*`,
  ],
  cli: {
    entitiesDir: `${rootPath}/core/data/database/entities`,
    migrationsDir: `${rootPath}/core/data/database/migrations`,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    }
  }
}