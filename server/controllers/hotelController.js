import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// POST /api/hotels - Register/Create a new hotel
export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Check if user already has a hotel registered
    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.json({ success: false, message: "Hotel Already Registered" });
    }

    const hotel = await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
    
    res.json({ success: true, hotel, message: "Hotel Registered Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/hotels - Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .populate("owner", "username email image")
      .sort({ createdAt: -1 });
    
    res.json({ success: true, hotels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/hotels/:id - Get hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const hotel = await Hotel.findById(id).populate("owner", "username email image");
    
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    
    res.json({ success: true, hotel });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/hotels/owner - Get hotel by owner (current user)
export const getOwnerHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    
    if (!hotel) {
      return res.json({ success: false, message: "No hotel found for this owner" });
    }
    
    res.json({ success: true, hotel });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/hotels/:id - Update hotel
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact, city } = req.body;
    
    // Verify ownership
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Not authorized to update this hotel" });
    }
    
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { name, address, contact, city },
      { new: true }
    );
    
    res.json({ success: true, hotel: updatedHotel, message: "Hotel updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/hotels/:id - Delete hotel
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify ownership
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }
    
    if (hotel.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Not authorized to delete this hotel" });
    }
    
    await Hotel.findByIdAndDelete(id);
    
    // Reset user role back to regular user
    await User.findByIdAndUpdate(req.user._id, { role: "user" });
    
    res.json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
