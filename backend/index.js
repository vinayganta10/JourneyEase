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

mongoose.connect("mongodb+srv://aggvinayganta10:It3RHJS2IKD4Lte3@cluster0.7ou0dbw.mongodb.net/").then(()=>{console.log('Connected....')}).catch(()=>{console.log('error')});


const app = express();

app.use(cors());
app.use(express.json());

const secret = "secret";

// middlewares
app.use("/api/admin",admins);
app.use("/api/customers",users);
app.use("/api/bookings",bookings);
app.use('/api',listings);

async function signer(data){
    return jwt.sign(data,secret,{"expiresIn":"1h"});
}

app.get("/",(req,res)=>{
    res.send("Welcome to travelling booking app");
})

app.post('/api/signup',async (req,res)=>{
    let body = req.body;
    let token = await signer(body);
    const newUser = new user(body);
    await newUser.save().then(()=>{
        console.log("saved successfully");
    }).catch(err =>console.error(err));
    res.send(token);
});

app.post('/api/login',async (req,res)=>{
    let body = req.body;
    let exists = await user.find({username:body.username,password:body.password});
    if(exists.length===0) {
        res.status(300).send("<h1>User not found</h1>");
    }
    else{
        let token = await signer(body);
        res.send(token);
    }
});

app.listen(4000,()=>{
    console.log("listening");
});

// export default validate;