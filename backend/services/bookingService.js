const mongoose = require("mongoose");
const Seat = require("../models/SeatModel");
const Booking = require("../models/BookingModel");

const bookSeats = async (showId, seatNumbers) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Get available seats
    const seats = await Seat.find({
      show_id: showId,
      seat_number: { $in: seatNumbers },
      status: "AVAILABLE"
    }).session(session);

    if (seats.length !== seatNumbers.length) {
      throw new Error("Some seats are already booked");
    }

    const seatIds = seats.map(s => s._id);

    // Step 2: Lock seats
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      { status: "HELD" },
      { session }
    );

    // Step 3: Create booking
    const booking = await Booking.create([{
      show_id: showId,
      seats: seatIds,
      status: "PENDING"
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return booking[0];

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

module.exports = { bookSeats };