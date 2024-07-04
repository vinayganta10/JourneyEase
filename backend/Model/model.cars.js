import mongoose from "mongoose";
let schema = new mongoose.Schema({
    "id":String,
    "make":String,
    "model":String,
    "price":Number
});

let cars = mongoose.model('cars',schema);

export default cars;

