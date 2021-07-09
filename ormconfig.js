require('dotenv').config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    `${process.env.ENTITIES_DIR}/core/data/database/entities/**/*`,
  ],
  cli: {
    entitiesDir: `${process.env.ENTITIES_DIR}/core/data/database/entities`,
    migrationsDir: `${process.env.ENTITIES_DIR}/core/data/database/migrations`,
  },
  migrations: [
    `${process.env.ENTITIES_DIR}/core/data/database/migrations/**/*`,
  ],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    }
  }
}