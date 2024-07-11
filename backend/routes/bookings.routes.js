import express from 'express';
import booking from '../Model/model.bookings.js';
import nodemailer from 'nodemailer';
import validate from '../auth/verify.js';

const bookings = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aggvinayganta10@gmail.com',
      pass: 'ykoyhgbyzrquzlws',
    },
  });

bookings.post("/",async(req,res)=>{
    // const bToken = req.header.Authorization;
    // const token = bToken[1];
    // const flag = verify(token);
    const { userId, bookingId, items,email } = req.body;
    let newBooking = new booking(req.body);
    const bookingDetails = {
        userId,
        bookingId,
        items,
        createdAt: new Date(),
      };
    
    const mailOptions = {
        from: 'aggvinayganta10@gmail.com',
        to: email,
        subject: 'Your Booking Confirmation',
        text: `Thank you for your booking.Here are the details:\n\n${JSON.stringify(bookingDetails, null, 2)}`,
        attachments: [
            {
              filename: 'ticket.json',
              content: JSON.stringify(bookingDetails),
              contentType: 'application/json',
            },
          ],
      };
    
    await newBooking.save().then(()=>{console.log("Booking done")}).catch((err)=>console.log(err));
    await transporter.sendMail(mailOptions);
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