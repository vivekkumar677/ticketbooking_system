const Show = require("../models/ShowModel");
const Seat = require("../models/SeatModel");

const createShow = async (req, res) => {
  const { name, start_time, total_seats } = req.body;

  try {
    const show = await Show.create({ name, start_time, total_seats });

    const seats = [];
    for (let i = 1; i <= total_seats; i++) {
      seats.push({
        show_id: show._id,
        seat_number: i
      });
    }

    await Seat.insertMany(seats);

    res.status(201).json(show);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getShowById = async (req, res) => {
  const { id } = req.params;

  try {
    const show = await Show.findById(id).lean(); // fetch show
    if (!show) return res.status(404).json({ error: "Show not found" });

    // optional: include booked seats
    const bookedSeats = await Seat.find({ show: id, isBooked: true }).select("_id seatNumber");
    show.bookedSeats = bookedSeats.map(s => s._id);

    res.status(200).json(show);
  } catch (err) {
    console.error("Error fetching show:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createShow, getAllShows, getShowById };