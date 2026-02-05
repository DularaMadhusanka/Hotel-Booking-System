import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// POST /api/reviews - Create a new review
export const createReview = async (req, res) => {
  try {
    const { 
      bookingId, 
      rating, 
      title, 
      comment,
      cleanlinessRating,
      serviceRating,
      locationRating,
      valueRating
    } = req.body;
    const userId = req.user._id;

    // Verify booking exists and belongs to user
    const booking = await Booking.findById(bookingId).populate("room hotel");
    
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    
    if (booking.user.toString() !== userId.toString()) {
      return res.json({ success: false, message: "You can only review your own bookings" });
    }
    
    // Check if booking is completed (checkout date has passed)
    if (new Date(booking.checkOutDate) > new Date()) {
      return res.json({ success: false, message: "You can only review after checkout" });
    }
    
    // Check if user already reviewed this booking
    const existingReview = await Review.findOne({ booking: bookingId, user: userId });
    if (existingReview) {
      return res.json({ success: false, message: "You have already reviewed this booking" });
    }

    const review = await Review.create({
      user: userId,
      room: booking.room._id,
      hotel: booking.hotel._id,
      booking: bookingId,
      rating,
      title,
      comment,
      cleanlinessRating,
      serviceRating,
      locationRating,
      valueRating
    });

    res.json({ success: true, review, message: "Review submitted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/reviews - Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate("user", "username image")
      .populate("room", "roomType images")
      .populate("hotel", "name city")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/reviews/hotel/:hotelId - Get reviews for a specific hotel
export const getHotelReviews = async (req, res) => {
  try {
    const { hotelId } = req.params;
    
    const reviews = await Review.find({ hotel: hotelId, isApproved: true })
      .populate("user", "username image")
      .populate("room", "roomType")
      .sort({ createdAt: -1 });

    // Calculate average ratings
    const totalReviews = reviews.length;
    if (totalReviews === 0) {
      return res.json({ 
        success: true, 
        reviews: [], 
        stats: { averageRating: 0, totalReviews: 0 }
      });
    }

    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;
    const avgCleanliness = reviews.reduce((acc, r) => acc + (r.cleanlinessRating || 0), 0) / totalReviews;
    const avgService = reviews.reduce((acc, r) => acc + (r.serviceRating || 0), 0) / totalReviews;
    const avgLocation = reviews.reduce((acc, r) => acc + (r.locationRating || 0), 0) / totalReviews;
    const avgValue = reviews.reduce((acc, r) => acc + (r.valueRating || 0), 0) / totalReviews;

    res.json({ 
      success: true, 
      reviews,
      stats: {
        averageRating: avgRating.toFixed(1),
        averageCleanliness: avgCleanliness.toFixed(1),
        averageService: avgService.toFixed(1),
        averageLocation: avgLocation.toFixed(1),
        averageValue: avgValue.toFixed(1),
        totalReviews
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/reviews/room/:roomId - Get reviews for a specific room
export const getRoomReviews = async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const reviews = await Review.find({ room: roomId, isApproved: true })
      .populate("user", "username image")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : 0;

    res.json({ 
      success: true, 
      reviews,
      stats: { averageRating, totalReviews }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/reviews/user - Get current user's reviews
export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const reviews = await Review.find({ user: userId })
      .populate("room", "roomType images")
      .populate("hotel", "name city")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET /api/reviews/:id - Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Review.findById(id)
      .populate("user", "username image")
      .populate("room", "roomType images")
      .populate("hotel", "name city address");
    
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }
    
    res.json({ success: true, review });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/reviews/:id - Update review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      rating, 
      title, 
      comment,
      cleanlinessRating,
      serviceRating,
      locationRating,
      valueRating
    } = req.body;
    const userId = req.user._id;
    
    const review = await Review.findById(id);
    
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }
    
    // Verify user owns this review
    if (review.user.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Not authorized to update this review" });
    }
    
    // Update fields
    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;
    if (cleanlinessRating) review.cleanlinessRating = cleanlinessRating;
    if (serviceRating) review.serviceRating = serviceRating;
    if (locationRating) review.locationRating = locationRating;
    if (valueRating) review.valueRating = valueRating;
    
    await review.save();
    
    res.json({ success: true, review, message: "Review updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// PUT /api/reviews/:id/respond - Hotel owner responds to review
export const respondToReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerResponse } = req.body;
    
    const review = await Review.findById(id);
    
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }
    
    // Verify user is the hotel owner
    const hotel = await Hotel.findById(review.hotel);
    if (!hotel || hotel.owner.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Only hotel owner can respond to reviews" });
    }
    
    review.ownerResponse = ownerResponse;
    review.ownerResponseDate = new Date();
    await review.save();
    
    res.json({ success: true, review, message: "Response added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// POST /api/reviews/:id/helpful - Mark review as helpful
export const markReviewHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Review.findByIdAndUpdate(
      id,
      { $inc: { helpfulVotes: 1 } },
      { new: true }
    );
    
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }
    
    res.json({ success: true, helpfulVotes: review.helpfulVotes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE /api/reviews/:id - Delete review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const review = await Review.findById(id);
    
    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }
    
    // Verify user owns this review or is hotel owner
    const hotel = await Hotel.findById(review.hotel);
    const isHotelOwner = hotel && hotel.owner.toString() === userId.toString();
    const isReviewOwner = review.user.toString() === userId.toString();
    
    if (!isHotelOwner && !isReviewOwner) {
      return res.json({ success: false, message: "Not authorized to delete this review" });
    }
    
    await Review.findByIdAndDelete(id);
    
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
