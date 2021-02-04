const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host:'localhost',
  database: 'lightbnb',
  password:'123'
})

module.exports = pool;