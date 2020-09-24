const { join } = require("path")

// if (process.env.POSTGRES_SSL && process.env.POSTGRES_SSL === "true") {
//   const pg = require("pg")
//   pg.defaults.ssl = true
// }

const knexConfig = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, "src/knex/migrations"),
    },
    pool: {
      afterCreate: function (connection, callback) {
        connection.query("SET timezone = 'Europe/Paris';", function (err) {
          callback(err, connection)
        })
      },
      max: 15,
      min: 0,
    },
    seeds: {
      directory: join(__dirname, "src/knex/seeds/development"),
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, "src/knex/migrations"),
    },
    pool: {
      afterCreate: function (connection, callback) {
        connection.query("SET timezone = 'Europe/Paris';", function (err) {
          callback(err, connection)
        })
      },
      max: 15,
      min: 0,
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, "src/knex/migrations"),
    },
    pool: {
      afterCreate: function (connection, callback) {
        connection.query("SET timezone = 'Europe/Paris';", function (err) {
          callback(err, connection)
        })
      },
      max: 15,
      min: 0,
    },
    seeds: {
      directory: join(__dirname, "src/knex/seeds/staging"),
    },
  },
}

module.exports = knexConfig
