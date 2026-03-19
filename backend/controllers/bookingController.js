const bookingService = require('../services/bookingService');
const Booking = require('../models/BookingModel');
const Seat = require('../models/SeatModel');

const bookSeats = async (req, res) => {
  const { showId, seatNumbers } = req.body;
  try {
    const booking = await bookingService.bookSeats(showId, seatNumbers);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ✅ Confirm booking
const confirmBooking = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking || booking.status !== "PENDING") {
      return res.status(400).json({ success: false, message: "Invalid booking" });
    }

    // Update seats → BOOKED
    await Seat.updateMany(
      { _id: { $in: booking.seats } },
      { status: "BOOKED" }
    );

    booking.status = "CONFIRMED";
    await booking.save();

    res.json({ success: true, message: "Booking confirmed", booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  bookSeats,
  confirmBooking,
};