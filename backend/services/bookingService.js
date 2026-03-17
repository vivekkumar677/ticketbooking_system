const pool = require("../config/db");

const bookSeats = async (showId, seatNumbers) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const seats = await client.query(
      `SELECT * FROM seats
       WHERE show_id = $1 AND seat_number = ANY($2)
       FOR UPDATE`,
      [showId, seatNumbers],
    );

    if (seats.rows.length !== seatNumbers.length) {
      throw new Error("Invalid seats");
    }

    const alreadyBooked = seats.rows.some((s) => s.is_booked);
    if (alreadyBooked) {
      throw new Error("Seats already booked");
    }

    const booking = await client.query(
      `INSERT INTO bookings(show_id, status)
       VALUES($1,'CONFIRMED') RETURNING *`,
      [showId],
    );

    const bookingId = booking.rows[0].id;

    for (let seat of seats.rows) {
      await client.query(
        `INSERT INTO booking_seats(booking_id, seat_id)
         VALUES($1,$2)`,
        [bookingId, seat.id],
      );
    }

    await client.query(`UPDATE seats SET is_booked = true WHERE id = ANY($1)`, [
      seats.rows.map((s) => s.id),
    ]);

    await client.query("COMMIT");

    return booking.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  bookSeats,
};
