import express from 'express';
import user from '../Model/model.users.js';

const users = express.Router();

users.get('/:id',async(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    const data = await(user.findOne({username:id}));
    const userData = {
        "username":data.username,
        "email":data.email
    }
    res.send(userData);
});


users.put('/:id',async(req,res)=>{
    let id = req.params.id;
    const updated = req.body;
    await user.findOneAndUpdate({username:id},updated);
    res.send("updated");
});

export default users;