// src/pages/CreateShow.tsx
import React, { useState } from 'react';
import { Box, Button, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextField, TextFieldVariants, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import { createShow } from '../api/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { JSX } from 'react/jsx-runtime';

const CreateShow: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [totalSeats, setTotalSeats] = useState<number>(40);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !startTime || totalSeats <= 0) {
      setError('Please fill all fields with valid values.');
      return;
    }
    setLoading(true);
    try {
      await createShow({
        name,
        start_time: startTime.toISOString(),
        total_seats: totalSeats,
      });
      navigate('/admin');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create show');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth={500} mx="auto">
      <Typography variant="h4" mb={3}>Create New Show/Trip</Typography>
      {error && <Error message={error} />}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Show/Trip Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Total Seats"
          type="number"
          fullWidth
          margin="normal"
          value={totalSeats}
          onChange={e => setTotalSeats(Number(e.target.value))}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue: React.SetStateAction<dayjs.Dayjs | null>) => setStartTime(newValue)}
            renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <Loading /> : 'Create Show'}
        </Button>
      </form>
    </Box>
  );
};

export default CreateShow;