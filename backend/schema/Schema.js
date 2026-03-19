const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    name: { type: String, required: true },
    start_time: { type: Date, required: true },
    total_seats: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Show", showSchema);