import express from 'express';
import cars from '../Model/model.cars.js'
import flights from '../Model/model.flights.js';
import hotels from '../Model/model.hotels.js';

const admins = express.Router()

admins.use(express.json());

admins.post('/flights',async (req,res)=>{
    let body = req.body;
    let newFlight = new flights(body);
    await newFlight.save().then(()=>console.log("saved successfully")).catch((err)=>{
        if(err) throw err;
    });
    res.send("inserted");
});

admins.post('/cars',async (req,res)=>{
    let body = req.body;
    let newCar = new cars(body);
    await newCar.save().then(()=>console.log("saved successfully")).catch((err)=>{
        if(err) throw err;
    });
    res.send("inserted");
});

admins.post('/hotels',async (req,res)=>{
    let body = req.body;
    let newHotel = new hotels(body);
    await newHotel.save().then(()=>console.log("saved successfully")).catch((err)=>{
        if(err) throw err;
    });
    res.send("inserted");
});

admins.put('/flights/:id',async(req,res)=>{
    let body = req.body;
    await flights.findByIdAndUpdate(id,body);
    res.send("updated");
});

admins.put('/cars/:id',async(req,res)=>{
    let body = req.body;
    await cars.findByIdAndUpdate(id,body);
    res.send("updated");
});

admins.put('/hotels/:id',async (req,res)=>{
    let body = req.body;
    await hotels.findByIdAndUpdate(id,body);
    res.send("updated");
});

//vikas theorem
// admins.delete('/flights/',async(req,res)=>{
//     await flights.deleteMany({});
//     res.send("deleted");
// });

admins.delete('/flights/:id',async(req,res)=>{
    let id = req.params.id;
    await flights.deleteOne({id:id});
    res.send("deleted");
});

admins.delete('/cars/:id',async (req,res)=>{
    let id = req.params.id;
    await cars.deleteOne({id:id});
    res.send("deleted");
});

admins.delete('/hotels/:id',async (req,res)=>{
    let id = req.params.id;
    await hotels.deleteOne({id:id});
    res.send("deleted");
});

export default admins;
