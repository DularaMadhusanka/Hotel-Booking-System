import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) return res.json({ success: false, Message: "No Hotel found" });

    const images = await Promise.all(
      req.files.map(file =>
        cloudinary.uploader.upload(file.path).then(r => r.secure_url)
      )
    );

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images
    });

    res.json({ success: true, Message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, Message: error.message });
  }
};

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

export const getOwnerRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotel._id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await Room.findById(roomId);

    room.isAvailable = !room.isAvailable;
    await room.save();

    res.json({ success: true, Message: "Room availability Updated" });
  } catch (error) {
    res.json({ success: false, Message: error.message });
  }
};
