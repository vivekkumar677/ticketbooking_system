const cron = require("node-cron");
const Booking = require("../models/BookingModel");
const Seat = require("../models/SeatModel");

cron.schedule("* * * * *", async () => {
  try {
    const expired = await Booking.find({
      status: "PENDING",
      createdAt: { $lt: new Date(Date.now() - 120000) }
    });

    for (let booking of expired) {
      await Seat.updateMany(
        { _id: { $in: booking.seats } },
        { status: "AVAILABLE" }
      );

      booking.status = "FAILED";
      await booking.save();
    }

    console.log("Expired bookings handled");
  } catch (err) {
    console.error(err);
  }
});