require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false, // ✅ no SSL for local
});

pool.connect((err) => {
    if (err) {
        console.error('⚠️Database connection error', err);
    } else {
        console.log('✅ Connected to the database successfully');
    }
});

module.exports = pool;