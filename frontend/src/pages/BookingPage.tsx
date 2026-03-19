
// src/pages/BookingPage.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchShowById, bookSeats, confirmBooking } from '../api/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SeatGrid, { Seat } from '../components/SeatGrid';
import { Button, Typography, Box } from '@mui/material';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [show, setShow] = useState<{ _id: string; name: string; seats: Seat[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // number[] now
  const [booking, setBooking] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState('');

  // fetch updated show data after booking/confirming to get latest seat availability
  const fetchShow = async () => {
    if (!id) return;
    try {
      const res = await fetchShowById(id);
      setShow(res.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchShowById(id);
        setShow(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBooking = async () => {
    if (!id || selectedSeats.length === 0) return;
    setBookingStatus('PENDING');
    try {
      const res = await bookSeats(id, selectedSeats); // now sends numbers
      setBooking(res.data.booking);
      setBookingStatus(res.data.booking.status || 'PENDING');

      await fetchShow(); // directly call fetchShow to update show and seats
    } catch (err: any) {
      console.error('Booking error:', err.response?.data || err.message);
      setBookingStatus('FAILED');
    }
  };

  const handleConfirm = async () => {
    if (!booking?._id) return;
    setBookingStatus('CONFIRMING');
    try {
      const res = await confirmBooking(booking._id);
      setBooking(res.data.booking);
      setBookingStatus(res.data.booking.status);
    
      await fetchShow(); // directly call fetchShow to update show and seats
    } catch (err) {
      setBookingStatus('FAILED');
    }
  };

  if (!id) return <Error message="Invalid show ID" />;
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Box p={3}>
      <Typography variant="h4">{show?.name}</Typography>

      {show && (
        <SeatGrid
          key={show._id}
          seats={show.seats}
          onSelectSeats={setSelectedSeats} // receives number[]
        />
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBooking}
          disabled={bookingStatus === 'PENDING' || bookingStatus === 'CONFIRMING' || selectedSeats.length === 0}
        >
          Book Selected Seats
        </Button>

        {booking?.status === 'PENDING' && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleConfirm}
            sx={{ ml: 2 }}
          >
            Confirm Booking
          </Button>
        )}
      </Box>

      {bookingStatus === "FAILED" && (
        <Typography color='error' mt={2}>Status: {bookingStatus}, Some seats are already booked. Please select different seats.</Typography>
      )}
      {bookingStatus === "CONFIRMING" && (
        <Typography color='info' mt={2}>Status: Please wait while we are {bookingStatus} your booking...</Typography>
      )}
      {bookingStatus === "CONFIRMED" && (
        <Typography color='success' mt={2}>Status: Your booking is {bookingStatus}!</Typography>
      )}
    </Box>
  );
};

export default BookingPage;