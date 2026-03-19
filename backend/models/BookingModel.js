
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  show_id: { type: mongoose.Schema.Types.ObjectId, ref: "Show" },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }],
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "FAILED"],
    default: "PENDING"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);