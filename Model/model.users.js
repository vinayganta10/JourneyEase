const mongoose = require('mongoose');
const zod = require('zod')




const userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String
});

