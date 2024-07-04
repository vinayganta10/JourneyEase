import express from 'express';
import booking from '../Model/model.bookings.js';

const bookings = express.Router();


bookings.post("/",async(req,res)=>{
    // const bToken = req.header.Authorization;
    // const token = bToken[1];
    // const flag = verify(token);
    let newBooking = new booking(req.body);
    await newBooking.save().then(()=>{console.log("Booking done")}).catch((err)=>console.log(err));
    res.send("new booking created");
});

bookings.get("/:customerId",async(req,res)=>{
    let user = req.params.customerId;
    let bookingData = await booking.find({userId: user});
    res.send(JSON.stringify(bookingData));
});

bookings.delete("/:bookingId",async(req,res)=>{
    let id = req.params.bookingId;
    await booking.deleteOne({bookingId:id});
    res.send("deleted successfully");
});

export default bookings;