import mongoose from "mongoose";
let hotelSchema = new mongoose.Schema({
    "hotelId":String,
    "name":String,
    "location":String,
    "price":Number
});

let hotels = mongoose.model('hotels',hotelSchema);

export default hotels;