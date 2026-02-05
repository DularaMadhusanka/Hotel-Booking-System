import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPayment,
  getAllPayments,
  getUserPayments,
  getHotelPayments,
  getPaymentByBooking,
  getPaymentById,
  updatePayment,
  confirmPayment,
  refundPayment,
  deletePayment
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

// Payment CRUD operations
paymentRouter.post("/", protect, createPayment);                      // Create payment
paymentRouter.get("/", protect, getAllPayments);                      // Get all payments
paymentRouter.get("/user", protect, getUserPayments);                 // Get user's payments
paymentRouter.get("/hotel", protect, getHotelPayments);               // Get hotel payments
paymentRouter.get("/booking/:bookingId", protect, getPaymentByBooking);// Get payment by booking
paymentRouter.get("/:id", protect, getPaymentById);                   // Get payment by ID
paymentRouter.put("/:id", protect, updatePayment);                    // Update payment
paymentRouter.put("/:id/confirm", protect, confirmPayment);           // Confirm cash payment
paymentRouter.put("/:id/refund", protect, refundPayment);             // Process refund
paymentRouter.delete("/:id", protect, deletePayment);                 // Delete payment

export default paymentRouter;
