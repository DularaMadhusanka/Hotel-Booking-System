import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { 
    type: String, 
    ref: "User", 
    required: true 
  },
  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room", 
    required: true 
  },
  hotel: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Hotel", 
    required: true 
  },
  booking: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Booking", 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  title: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  comment: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  // Specific ratings
  cleanlinessRating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  serviceRating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  locationRating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  valueRating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  // Review images (optional)
  images: [{ 
    type: String 
  }],
  // Hotel owner response
  ownerResponse: {
    type: String,
    maxlength: 500
  },
  ownerResponseDate: {
    type: Date
  },
  // Helpful votes
  helpfulVotes: { 
    type: Number, 
    default: 0 
  },
  // Status for moderation
  isApproved: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

// Index for efficient queries
reviewSchema.index({ hotel: 1, createdAt: -1 });
reviewSchema.index({ room: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
