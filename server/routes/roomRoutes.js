import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createRoom,
  getRooms,
  getOwnerRooms,
  toggleRoomAvailability
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 5), createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", getOwnerRooms);
roomRouter.patch("/availability", toggleRoomAvailability);

export default roomRouter;
