process.env.TZ='UTC'
process.env.NODE_ENV = 'test'
const { expect } = require('chai')
const supertest = require('supertest')

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || "postgresql://jyip:1234@localhost/noteful_test"

global.expect = expect
global.supertest = supertest