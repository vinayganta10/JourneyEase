import express from 'express';
import cars from '../Model/model.cars.js'
import flights from '../Model/model.flights.js';
import hotels from '../Model/model.hotels.js';
import jwt from 'jsonwebtoken'

const listings = express.Router();

async function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

function validate(req,res,next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).send('Token is required');
    }
    const token = authHeader.split(' ')[1];
    verify(token)
        .then(decoded => {
            req.user = decoded;
            next();
        })
        .catch(err => {
            res.status(401).send('Invalid token: ' + err.message);
        });
}

listings.get("/flights",validate,async(req,res)=>{
    const data = await flights.find({});
    res.send(data);
});

listings.get("/hotels",validate,async(req,res)=>{
    const data = await hotels.find({});
    res.send(JSON.stringify(data));
});

listings.get('/cars',validate,async(req,res)=>{
    const data = await cars.find({});
    res.send(data);
});


export default listings;