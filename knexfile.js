// Update with your config settings.
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres:password@db:5432/amigo',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_TEST_URL || 'postgres://postgres:password@testdb:5432/amigo_test',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  }
}
