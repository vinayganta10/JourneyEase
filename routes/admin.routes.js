import express from 'express';

const admins = express.Router()

admins.post('/flights',(req,res)=>{
    res.send("OK");
});

admins.post('/cars',(req,res)=>{
    res.send("OK");
});

admins.post('hotels',(req,res)=>{
    res.send("OK");
});

admins.put('/flights/:id',(req,res)=>{
    res.send("OK");
});

admins.put('/cars/:id',(req,res)=>{
    res.send("OK");
});

admins.put('/hotels/:id',(req,res)=>{
    res.send("OK");
});


admins.delete('/flights/:id',(req,res)=>{
    res.send("OK");

});

admins.delete('/cars/:id',(req,res)=>{
    res.send("OK");
});

admins.delete('/hotels/:id',(req,res)=>{
    res.send("OK");
});

export default admins;
