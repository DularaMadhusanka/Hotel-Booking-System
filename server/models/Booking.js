import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema( {
 user:{ type : String, ref : "User", required :true },
   room:{ type : String,reg: "Room" ,required :true },
      hotel:{ type : String,ref: "Hotel", required :true },
   checkInDate:{ type : Date, required :true},
  checkOutDate:{ type :Date, required :true},
  totalPrice:{ type :Date, required :true},
  guests:{ type :Date, required :true},
 status:{ type :Date, required :true},

  
}, {timestamps : true}
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;