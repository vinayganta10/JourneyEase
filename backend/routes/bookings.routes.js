import express from 'express';

const bookings = express.Router();

bookings.post("/",(req,res)=>{
    res.send("ok");
});

bookings.get("/:customerId",(req,res)=>{
    res.send("ok");
});


export default bookings;