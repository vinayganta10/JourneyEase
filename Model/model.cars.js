import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/journeyEase");

let schema = new mongoose.Schema({
    "carId":String,
    "make":String,
    "model":String,
    "price":Number
});

let cars = mongoose.model('cars',schema);

export default cars;

