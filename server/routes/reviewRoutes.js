import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createReview,
  getAllReviews,
  getHotelReviews,
  getRoomReviews,
  getUserReviews,
  getReviewById,
  updateReview,
  respondToReview,
  markReviewHelpful,
  deleteReview
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// Review CRUD operations
reviewRouter.post("/", protect, createReview);                    // Create review
reviewRouter.get("/", getAllReviews);                             // Get all reviews
reviewRouter.get("/hotel/:hotelId", getHotelReviews);             // Get hotel reviews
reviewRouter.get("/room/:roomId", getRoomReviews);                // Get room reviews
reviewRouter.get("/user", protect, getUserReviews);               // Get user's reviews
reviewRouter.get("/:id", getReviewById);                          // Get review by ID
reviewRouter.put("/:id", protect, updateReview);                  // Update review
reviewRouter.put("/:id/respond", protect, respondToReview);       // Owner respond to review
reviewRouter.post("/:id/helpful", markReviewHelpful);             // Mark review helpful
reviewRouter.delete("/:id", protect, deleteReview);               // Delete review

export default reviewRouter;
