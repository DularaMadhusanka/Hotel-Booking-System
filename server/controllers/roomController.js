import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// POST /api/rooms - Create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    const images = await Promise.all(
      (req.files || []).map(file =>
        cloudinary.uploader.upload(file.path).then(r => r.secure_url)
      )
    );

    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images
    });

    res.json({ success: true, room, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/rooms - Get all available rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: { path: "owner", select: "image" }
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/rooms/all - Get all rooms (including unavailable)
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate({
        path: "hotel",
        populate: { path: "owner", select: "image" }
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/rooms/owner - Get owner's rooms
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    
    if (!hotelData) {
      return res.json({ success: false, message: "No hotel found for this owner" });
    }
   
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/rooms/:id - Get room by ID
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const room = await Room.findById(id).populate({
      path: "hotel",
      populate: { path: "owner", select: "image username" }
    });
    
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }
    
    res.json({ success: true, room });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/rooms/:id - Update room
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomType, pricePerNight, amenities, isAvailable } = req.body;
    
    const room = await Room.findById(id).populate("hotel");
    
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }
    
    // Verify ownership
    if (room.hotel.owner.toString() !== req.auth.userId) {
      return res.json({ success: false, message: "Not authorized to update this room" });
    }
    
    // Handle new images if uploaded
    let images = room.images;
    if (req.files && req.files.length > 0) {
      images = await Promise.all(
        req.files.map(file =>
          cloudinary.uploader.upload(file.path).then(r => r.secure_url)
        )
      );
    }
    
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { 
        roomType, 
        pricePerNight: +pricePerNight, 
        amenities: typeof amenities === 'string' ? JSON.parse(amenities) : amenities,
        isAvailable,
        images
      },
      { new: true }
    );
    
    res.json({ success: true, room: updatedRoom, message: "Room updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/rooms/:id - Delete room
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    
    const room = await Room.findById(id).populate("hotel");
    
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }
    
    // Verify ownership
    if (room.hotel.owner.toString() !== req.auth.userId) {
      return res.json({ success: false, message: "Not authorized to delete this room" });
    }
    
    // Delete images from Cloudinary (optional - extract public_id from URL)
    // for (const imageUrl of room.images) {
    //   const publicId = imageUrl.split('/').pop().split('.')[0];
    //   await cloudinary.uploader.destroy(publicId);
    // }
    
    await Room.findByIdAndDelete(id);
    
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// POST /api/rooms/toggle-availability - Toggle room availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();

    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
