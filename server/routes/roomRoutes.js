import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getRooms,
  getAllRooms,
  getOwnerRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  toggleRoomAvailability
} from "../controllers/roomController.js";

const roomRouter = express.Router();

// Room CRUD operations
roomRouter.post("/", protect, upload.array("images", 5), createRoom);           // Create room (protected)
roomRouter.get("/", getRooms);                                                   // Get available rooms (public)
roomRouter.get("/all", getAllRooms);                                             // Get all rooms (public)
roomRouter.get("/owner", protect, getOwnerRooms);                                // Get owner's rooms (protected)
roomRouter.get("/:id", getRoomById);                                             // Get room by ID (public)
roomRouter.put("/:id", protect, upload.array("images", 5), updateRoom);          // Update room (protected)
roomRouter.delete("/:id", protect, deleteRoom);                                  // Delete room (protected)
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);        // Toggle availability (protected)

export default roomRouter;
