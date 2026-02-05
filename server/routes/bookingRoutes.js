import express from 'express';
import { 
  checkAvailabilityAPI, 
  createBooking, 
  getAllBookings,
  getUserBookings,
  getHotelBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

// Booking CRUD operations
bookingRouter.post('/check-availability', checkAvailabilityAPI);  // Check availability
bookingRouter.post('/book', protect, createBooking);              // Create booking
bookingRouter.get('/', protect, getAllBookings);                  // Get all bookings
bookingRouter.get('/user', protect, getUserBookings);             // Get user's bookings
bookingRouter.get('/hotel', protect, getHotelBookings);           // Get hotel bookings (dashboard)
bookingRouter.get('/:id', protect, getBookingById);               // Get booking by ID
bookingRouter.put('/:id', protect, updateBooking);                // Update booking
bookingRouter.put('/:id/cancel', protect, cancelBooking);         // Cancel booking
bookingRouter.delete('/:id', protect, deleteBooking);             // Delete booking

export default bookingRouter;