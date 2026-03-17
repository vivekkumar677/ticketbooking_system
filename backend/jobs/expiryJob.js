const cron = require('node-cron');
const pool = require('../config/db');

cron.schedule('* * * * *', async () => {
  await pool.query(`
    UPDATE bookings
    SET status = 'FAILED'
    WHERE status = 'PENDING'
    AND created_at < NOW() - INTERVAL '2 minutes'
  `);
});