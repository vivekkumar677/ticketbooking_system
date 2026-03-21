
// src/components/SeatGrid.tsx
import { Grid, Button } from '@mui/material';
import React, { useState } from 'react';

export interface Seat {
  _id: string;
  seatNumber: number;
  isBooked: boolean;
}

interface SeatGridProps {
  seats?: Seat[];
  onSelectSeats: (seatNumbers: number[]) => void; // send numbers instead of _id
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats = [], onSelectSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const toggleSeat = (seatNumber: number) => {
    const newSelected = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(s => s !== seatNumber)
      : [...selectedSeats, seatNumber];

    setSelectedSeats(newSelected);
    onSelectSeats(newSelected);
  };

  if (!seats.length) return <p>No seats available</p>;

  return (
    <Grid container spacing={1}>
      {seats.map(seat => (
        <Grid key={seat._id}>
          <Button
            variant={selectedSeats.includes(seat.seatNumber) ? 'contained' : 'outlined'}
            color={seat.isBooked ? 'secondary' : 'primary'}
            disabled={seat.isBooked}
            onClick={() => toggleSeat(seat.seatNumber)}
          >
            {seat.seatNumber}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default SeatGrid;