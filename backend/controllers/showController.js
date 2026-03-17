const pool = require('../config/db');

// Create a new show
const createShow = async (req, res) => {
    const { name, start_time, total_seats } = req.body;

    try {
        const show = await pool.query(
            `INSERT INTO shows (name, start_time, total_seats) VALUES ($1, $2, $3) RETURNING *`,
            [name, start_time, total_seats]
        );

        // Create Seats for the show
        for(let i = 1; i <= total_seats; i++) {
            await pool.query(
                `INSERT INTO seats (show_id, seat_number) VALUES ($1, $2)`,
                [show.rows[0].id, i]
            );
        }
        res.status(201).json(show.rows[0]);
    } catch (err) {        
        console.error('Error creating show:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all shows
const getAllShows = async (req, res) => {
    try {
        const shows = await pool.query(`SELECT * FROM shows`);
        res.status(200).json(shows.rows);
    } catch (err) {
        console.error('Error getting shows:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createShow,
    getAllShows,
};