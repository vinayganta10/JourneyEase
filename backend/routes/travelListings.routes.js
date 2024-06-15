import express from 'express';
import cars from '../Model/model.cars.js'
import flights from '../Model/model.flights.js';
import hotels from '../Model/model.hotels.js';

const listings = express.Router();


function verify(token){
    return jwt.verify(token,process.env.secret,(err)=>{
        if(err) console.log(err);
    });
}

function validate(req,res,next){
    let token = localStorage.getItem('token');
    if(!token) {
        res.status(400);
    }
    if(verify(token)){
        next();
    }
}

listings.get("/flights",async(req,res)=>{
    const data = await flights.find({});
    res.send(data);
});

listings.get("/hotels",async(req,res)=>{
    const data = await hotels.find({});
    res.send(JSON.stringify(data));
});

listings.get('/cars',async(req,res)=>{
    const data = await cars.find({});
    res.send(data);
});


export default listings;