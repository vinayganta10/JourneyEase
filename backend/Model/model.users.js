import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    "username":String,
    "password":String,
    "email":String
});

const user = mongoose.model('users',userSchema)

export default user;
