import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/journeyEase");

let schema = new mongoose.Schema({
    "flightId":String,
    "origin":String,
    "destination":String, 
    "depatureTime":String,
    "arrivalTime":String,
    "price":Number
});

let flights = mongoose.model('flights',schema);

export default flights;