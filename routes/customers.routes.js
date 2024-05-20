import express from 'express';

const users = express.Router();

users.get('/:id',(req,res)=>{
    res.send("ok");
});


users.put('/:id',(req,res)=>{
    res.send("ok");
});

export default users;