import mongoose from "mongoose";
const schema = mongoose.Schema({
    "bookingId":String,
    "userId":String,
    "items":Object
});

const booking = mongoose.model("bookings",schema);

export default booking;
