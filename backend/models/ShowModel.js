const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  name: String,
  start_time: Date,
  total_seats: Number
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);