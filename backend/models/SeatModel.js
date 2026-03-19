const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  show_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show"
  },
  seat_number: Number,
  status: {
    type: String,
    enum: ["AVAILABLE", "HELD", "BOOKED"],
    default: "AVAILABLE"
  }
});

module.exports = mongoose.model("Seat", seatSchema);