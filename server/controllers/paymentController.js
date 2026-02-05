import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

// POST /api/payments - Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { 
      bookingId, 
      amount, 
      currency,
      method, 
      transactionId,
      cardLast4,
      cardBrand,
      notes
    } = req.body;
    const userId = req.user._id;

    // Verify booking exists
    const booking = await Booking.findById(bookingId).populate("hotel");
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    
    // Verify booking belongs to user
    if (booking.user.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Not authorized to pay for this booking" });
    }
    
    // Check if payment already exists for this booking
    const existingPayment = await Payment.findOne({ 
      booking: bookingId, 
      status: { $in: ['completed', 'pending'] }
    });
    
    if (existingPayment) {
      return res.json({ success: false, message: "Payment already exists for this booking" });
    }

    const payment = await Payment.create({
      booking: bookingId,
      user: userId,
      hotel: booking.hotel._id,
      amount: amount || booking.totalPrice,
      currency: currency || "LKR",
      method,
      transactionId,
      cardLast4,
      cardBrand,
      notes,
      status: method === 'cash' ? 'pending' : 'completed',
      paidAt: method !== 'cash' ? new Date() : null
    });

    // Update booking payment status if payment is completed
    if (payment.status === 'completed') {
      await Booking.findByIdAndUpdate(bookingId, { 
        isPaid: true,
        paymentMethod: method
      });
    }

    res.json({ success: true, payment, message: "Payment created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/payments - Get all payments (admin)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("booking")
      .populate("user", "username email")
      .populate("hotel", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/payments/user - Get current user's payments
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const payments = await Payment.find({ user: userId })
      .populate("booking")
      .populate("hotel", "name city")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/payments/hotel - Get hotel payments (owner dashboard)
export const getHotelPayments = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({ success: false, message: "No hotel found" });
    }

    const payments = await Payment.find({ hotel: hotel._id })
      .populate("booking")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    // Calculate statistics
    const totalPayments = payments.length;
    const completedPayments = payments.filter(p => p.status === 'completed');
    const totalRevenue = completedPayments.reduce((acc, p) => acc + p.amount, 0);
    const pendingAmount = payments
      .filter(p => p.status === 'pending')
      .reduce((acc, p) => acc + p.amount, 0);

    res.json({ 
      success: true, 
      payments,
      stats: {
        totalPayments,
        totalRevenue,
        pendingAmount,
        completedCount: completedPayments.length
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/payments/booking/:bookingId - Get payment for a booking
export const getPaymentByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const payment = await Payment.findOne({ booking: bookingId })
      .populate("booking")
      .populate("user", "username email")
      .populate("hotel", "name");
    
    if (!payment) {
      return res.json({ success: false, message: "Payment not found for this booking" });
    }
    
    res.json({ success: true, payment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/payments/:id - Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Payment.findById(id)
      .populate("booking")
      .populate("user", "username email image")
      .populate("hotel", "name city address");
    
    if (!payment) {
      return res.json({ success: false, message: "Payment not found" });
    }
    
    // Verify access
    const hotel = await Hotel.findById(payment.hotel);
    const isHotelOwner = hotel && hotel.owner.toString() === req.user._id.toString();
    const isPaymentUser = payment.user._id.toString() === req.user._id.toString();
    
    if (!isHotelOwner && !isPaymentUser) {
      return res.json({ success: false, message: "Not authorized to view this payment" });
    }
    
    res.json({ success: true, payment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/payments/:id - Update payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, transactionId, notes } = req.body;
    
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.json({ success: false, message: "Payment not found" });
    }
    
    // Verify hotel owner
    const hotel = await Hotel.findById(payment.hotel);
    if (!hotel || hotel.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Only hotel owner can update payments" });
    }
    
    // Update payment
    if (status) {
      payment.status = status;
      if (status === 'completed') {
        payment.paidAt = new Date();
        // Update booking
        await Booking.findByIdAndUpdate(payment.booking, { isPaid: true });
      }
    }
    if (transactionId) payment.transactionId = transactionId;
    if (notes) payment.notes = notes;
    
    await payment.save();
    
    res.json({ success: true, payment, message: "Payment updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/payments/:id/confirm - Confirm cash payment (hotel owner)
export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.json({ success: false, message: "Payment not found" });
    }
    
    // Verify hotel owner
    const hotel = await Hotel.findById(payment.hotel);
    if (!hotel || hotel.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Only hotel owner can confirm payments" });
    }
    
    payment.status = 'completed';
    payment.paidAt = new Date();
    await payment.save();
    
    // Update booking
    await Booking.findByIdAndUpdate(payment.booking, { isPaid: true });
    
    res.json({ success: true, payment, message: "Payment confirmed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/payments/:id/refund - Process refund
export const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { refundAmount, refundReason } = req.body;
    
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.json({ success: false, message: "Payment not found" });
    }
    
    if (payment.status !== 'completed') {
      return res.json({ success: false, message: "Can only refund completed payments" });
    }
    
    // Verify hotel owner
    const hotel = await Hotel.findById(payment.hotel);
    if (!hotel || hotel.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Only hotel owner can process refunds" });
    }
    
    payment.status = 'refunded';
    payment.refundAmount = refundAmount || payment.amount;
    payment.refundReason = refundReason;
    payment.refundDate = new Date();
    await payment.save();
    
    // Update booking
    await Booking.findByIdAndUpdate(payment.booking, { 
      isPaid: false,
      status: 'cancelled'
    });
    
    res.json({ success: true, payment, message: "Refund processed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/payments/:id - Delete payment
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.json({ success: false, message: "Payment not found" });
    }
    
    // Only allow deletion of pending or cancelled payments
    if (payment.status === 'completed') {
      return res.json({ success: false, message: "Cannot delete completed payments. Use refund instead." });
    }
    
    // Verify hotel owner or payment user
    const hotel = await Hotel.findById(payment.hotel);
    const isHotelOwner = hotel && hotel.owner.toString() === req.user._id.toString();
    const isPaymentUser = payment.user.toString() === req.user._id.toString();
    
    if (!isHotelOwner && !isPaymentUser) {
      return res.json({ success: false, message: "Not authorized to delete this payment" });
    }
    
    await Payment.findByIdAndDelete(id);
    
    res.json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
