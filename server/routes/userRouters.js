import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
  getUserData, 
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  storeRecentSearchedCities 
} from "../controllers/userController.js";

const userRouter = express.Router();

// User CRUD operations
userRouter.get("/", protect, getUserData);           // Get current user
userRouter.get("/all", protect, getAllUsers);        // Get all users
userRouter.get("/:id", protect, getUserById);        // Get user by ID
userRouter.put("/:id", protect, updateUser);         // Update user
userRouter.delete("/:id", protect, deleteUser);      // Delete user

// Additional operations
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;