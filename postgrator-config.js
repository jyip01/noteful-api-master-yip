require('dotenv').config();

const config = require('./src/config');

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "role": "jyip",
  "db": "noteful_test",
  /*"connectionString": (process.env.NODE_ENV === 'test')
    ? "postgresql://jyip:1234@localhost/noteful_test"
    : DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin:password@localhost/noteful',*/
    "connectionString": (process.env.NODE_ENV === 'test') 
    ? config.TEST_DATABASE_URL 
    : config.DATABASE_URL,
}