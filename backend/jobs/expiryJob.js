const cron = require("node-cron");
const pool = require("../config/db");

cron.schedule("* * * * *", async () => {
  try {
    await pool.query(`
    UPDATE public.bookings
    SET status = 'FAILED'
    WHERE status = 'PENDING'
    AND created_at < NOW() - INTERVAL '2 minutes'
  `);
    console.log("Expired bookings updated");
  } catch (err) {
    console.error("Error updating expired bookings:", err);
  }
});
