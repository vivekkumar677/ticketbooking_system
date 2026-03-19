
// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { fetchShows } from '../api/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShows()
      .then(res => setShows(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button
          component={Link}
          to="/admin/create"
          variant="contained"
          color="primary"
        >
          Create New Show
        </Button>
      </Box>

      <Grid container spacing={2}>
        {shows.length === 0 ? (
          <Typography>No shows/trips available.</Typography>
        ) : (
          shows.map(show => (
            <Grid key={show._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{show.name}</Typography>
                  <Typography>
                    Start Time: {new Date(show.start_time).toLocaleString()}
                  </Typography>
                  <Typography>Total Seats: {show.total_seats}</Typography>
                  <Typography>
                    Booked Seats: {show.bookedSeats ? show.bookedSeats.length : 0}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/bookings/${show._id}`} // match BookingPage route
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 1 }}
                  >
                    View Booking
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;