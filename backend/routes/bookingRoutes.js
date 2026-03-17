const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post("/book", bookingController.bookSeats);

module.exports = router;