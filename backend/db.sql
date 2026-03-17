# SQL Schema

CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    start_time TIMESTAMP,
    total_seats INT,
);

CREATE TABLE IF NOT EXISTS seats (
    id SERIAL PRIMARY KEY,
    show_id INT REFERENCES shows(id),
    seat_number INT,
    is_booked BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    show_id INT REFERENCES shows(id),
    status VARCHAR(20), -- PENDING, CONFIRMED, FAILED
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS booking_seats (
    booking_id INT REFERENCES bookings(id),
    seat_id INT REFERENCES seats(id)
);