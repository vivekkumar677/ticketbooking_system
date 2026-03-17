const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
require('./jobs/expiryJob');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

// Routes
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Ticket Booking API');
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
});