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

module.exports = { createShow, getAllShows };