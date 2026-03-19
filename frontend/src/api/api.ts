// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ticketbooking-system1.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Shows
export const fetchShows = () => api.get('/shows');
export const fetchShowById = (id: string) => api.get(`/shows/${id}`);
export const createShow = (data: any) => api.post('/shows', data);

// Booking
export const bookSeats = (showId: string, seatNumbers: number[]) =>
  api.post('/bookings/book', { showId, seatNumbers });

// Confirm
export const confirmBooking = (bookingId: string) =>
  api.post('/bookings/confirm', { bookingId });

export default api;