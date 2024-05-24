import express from 'express';
import admins from './routes/admin.routes.js';
import users from './routes/customers.routes.js';
import bookings from './routes/bookings.routes.js';
import listings from './routes/travelListings.routes.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import user from './Model/model.users.js';
import mongoose from "mongoose";
dotenv.config();

mongoose.connect("mongodb://localhost:27017/journeyEase").then(()=>{console.log('Connected....')}).catch(()=>{console.log('error')});


const app = express();

app.use(cors());
app.use(express.json());


// middlewares
app.use("/api/admin",admins);
app.use("/api/customers",users);
app.use("/api/bookings",bookings);
app.use('/api',listings);

function signer(data){
    return jwt.sign(data,process.env.secret,{"expiresIn":"1h"});
}

//jwt validate
app.get("/",(req,res)=>{
    res.send("Welcome to travelling booking app");
})

app.post('/api/signup',async (req,res)=>{
    let body = req.body;
    let token = signer(body);
    const newUser = new user(body);
    await newUser.save().then(()=>{
        console.log("saved successfully");
    }).catch(err =>console.error(err));
    res.send("user created successfully");
});

app.post('/api/login',async (req,res)=>{
    let body = req.body;
    let exists = await user.find({username:body.user,password:body.pass});
    let token = signer(body);
    res.send(token);
});

app.listen(process.env.port,()=>{
    console.log("listening");
});

// export default validate;