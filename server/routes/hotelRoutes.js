import express from 'express';    
import { protect } from '../middleware/authMiddleware.js';
import { 
  registerHotel,
  getAllHotels,
  getHotelById,
  getOwnerHotel,
  updateHotel,
  deleteHotel
} from '../controllers/hotelController.js';

const hotelRouter = express.Router();

// Hotel CRUD operations
hotelRouter.post('/', protect, registerHotel);       // Create hotel
hotelRouter.get('/', getAllHotels);                  // Get all hotels
hotelRouter.get('/owner', protect, getOwnerHotel);   // Get current user's hotel
hotelRouter.get('/:id', getHotelById);               // Get hotel by ID
hotelRouter.put('/:id', protect, updateHotel);       // Update hotel
hotelRouter.delete('/:id', protect, deleteHotel);    // Delete hotel

export default hotelRouter;