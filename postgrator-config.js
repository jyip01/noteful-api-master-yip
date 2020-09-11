require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "role": "jyip",
  "db": "noteful_test",
  "connectionString": (process.env.NODE_ENV === 'test')
    ? "postgresql://jyip:1234@localhost/noteful_test"
    : "postgresql://dunder_mifflin:password@localhost/noteful",
}