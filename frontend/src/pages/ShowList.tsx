// src/pages/ShowList.tsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const { shows } = useAppContext();
  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {shows.map(show => (
          <Grid key={show._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{show.name}</Typography>
                <Typography>Start Time: {new Date(show.start_time).toLocaleString()}</Typography>
                <Typography>Available Seats: {show.total_seats - (show.bookedSeats?.length || 0)}</Typography>
                <Button component={Link} to={`/bookings/${show._id}`} variant="contained" sx={{ mt: 1 }}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowList;