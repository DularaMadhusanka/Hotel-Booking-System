import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Helper function to check availability of Room
const checkAvailability = async ({ checkInDate, checkOutDate, room, excludeBookingId = null }) => {
  try {
    const query = {
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
      status: { $ne: "cancelled" }
    };
    
    // Exclude current booking when updating
    if (excludeBookingId) {
      query._id = { $ne: excludeBookingId };
    }
    
    const bookings = await Booking.find(query);
    return bookings.length === 0;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

// POST /api/bookings/check-availability - Check room availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// POST /api/bookings/book - Create new booking
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests, paymentMethod } = req.body;
    const user = req.user._id;

    // Check availability before booking
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Room is not available for selected dates",
      });
    }

    // Get room data for price calculation
    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    // Calculate total price based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalPrice = roomData.pricePerNight * nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
      paymentMethod: paymentMethod || "pay at hotel",
    });

    res.json({
      success: true,
      booking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// GET /api/bookings - Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/bookings/user - Get current user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;

    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// GET /api/bookings/hotel - Get hotel bookings (owner dashboard)
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({
        success: false,
        message: "No Hotel found",
      });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// GET /api/bookings/:id - Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id)
      .populate("room hotel user");
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    
    // Verify user owns this booking or is the hotel owner
    const hotel = await Hotel.findById(booking.hotel);
    const isOwner = hotel && hotel.owner.toString() === req.user._id.toString();
    const isBookingUser = booking.user._id.toString() === req.user._id.toString();
    
    if (!isOwner && !isBookingUser) {
      return res.json({ success: false, message: "Not authorized to view this booking" });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/bookings/:id - Update booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInDate, checkOutDate, guests, status, paymentMethod, isPaid } = req.body;
    
    const booking = await Booking.findById(id).populate("room");
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    
    // Verify user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      // Check if hotel owner
      const hotel = await Hotel.findById(booking.hotel);
      if (!hotel || hotel.owner.toString() !== req.user._id.toString()) {
        return res.json({ success: false, message: "Not authorized to update this booking" });
      }
    }
    
    // If dates are being changed, check availability
    if (checkInDate || checkOutDate) {
      const newCheckIn = checkInDate || booking.checkInDate;
      const newCheckOut = checkOutDate || booking.checkOutDate;
      
      const isAvailable = await checkAvailability({
        checkInDate: newCheckIn,
        checkOutDate: newCheckOut,
        room: booking.room._id,
        excludeBookingId: id
      });
      
      if (!isAvailable) {
        return res.json({ success: false, message: "Room is not available for selected dates" });
      }
      
      // Recalculate total price
      const checkIn = new Date(newCheckIn);
      const checkOut = new Date(newCheckOut);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      booking.totalPrice = booking.room.pricePerNight * nights;
      booking.checkInDate = newCheckIn;
      booking.checkOutDate = newCheckOut;
    }
    
    if (guests) booking.guests = +guests;
    if (status) booking.status = status;
    if (paymentMethod) booking.paymentMethod = paymentMethod;
    if (typeof isPaid === 'boolean') booking.isPaid = isPaid;
    
    await booking.save();
    
    res.json({ success: true, booking, message: "Booking updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/bookings/:id/cancel - Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    
    // Verify user owns this booking or is hotel owner
    const hotel = await Hotel.findById(booking.hotel);
    const isOwner = hotel && hotel.owner.toString() === req.user._id.toString();
    const isBookingUser = booking.user.toString() === req.user._id.toString();
    
    if (!isOwner && !isBookingUser) {
      return res.json({ success: false, message: "Not authorized to cancel this booking" });
    }
    
    booking.status = "cancelled";
    await booking.save();
    
    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/bookings/:id - Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    
    // Verify user owns this booking or is hotel owner
    const hotel = await Hotel.findById(booking.hotel);
    const isOwner = hotel && hotel.owner.toString() === req.user._id.toString();
    const isBookingUser = booking.user.toString() === req.user._id.toString();
    
    if (!isOwner && !isBookingUser) {
      return res.json({ success: false, message: "Not authorized to delete this booking" });
    }
    
    await Booking.findByIdAndDelete(id);
    
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
