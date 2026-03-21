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
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid show ID" });
    }

    const show = await Show.findById(id).lean();
    if (!show) return res.status(404).json({ error: "Show not found" });

    const seats = await Seat.find({ show_id: id }).select("_id seat_number status").lean();

    show.seats = seats.map(s => ({
      _id: s._id,
      seatNumber: s.seat_number,
      isBooked: s.status === "BOOKED" || s.status === true
    }));

    show.bookedSeats = seats
      .filter(s => s.status === "BOOKED" || s.status === true)
      .map(s => s.seat_number);

    console.log("Returning show:", JSON.stringify(show, null, 2));
    return res.status(200).json(show);
  } catch (err) {
    console.error("Error fetching show:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createShow, getAllShows, getShowById };