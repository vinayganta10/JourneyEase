import mongoose from "mongoose";
const schema = mongoose.Schema({
    "id":String,
    "bookingId":String,
    "userId":String,
    "items":Object
});

const booking = mongoose.model("bookings",schema);

export default booking;
