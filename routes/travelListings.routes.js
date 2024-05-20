import express from 'express';

const listings = express.Router();

listings.get("/flights",(req,res)=>{
    res.send("ok");
});

listings.get("/hotels",(req,res)=>{
    res.send("ok");
});

listings.get('/cars',(req,res)=>{
    res.send("ok");
});


export default listings;