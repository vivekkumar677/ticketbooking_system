const bookingService = require('../services/bookingService');

const bookSeats = async (req, res) => {
  const { showId, seatNumbers } = req.body;

    try {
        const booking = await bookingService.bookSeats(showId, seatNumbers);
        res.json({ sucess: true, booking });
    } catch (err) {
        console.error('Error booking seats:', err);
        res.status(400).json({ success: false, error: err.message });
    }
};

module.exports = {
  bookSeats,
};