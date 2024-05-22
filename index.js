import express from 'express';
import admins from './routes/admin.routes.js';
import users from './routes/customers.routes.js';
import bookings from './routes/bookings.routes.js';
import listings from './routes/travelListings.routes.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

function verify(token){
    return jwt.verify(token,process.env.secret,(err)=>{
        if(err) console.log(err);
    });
}

function signer(data){
    return jwt.sign(data,process.env.secret,{"expiresIn":"1h"});
}

//jwt validate
function validate(req,res,next){
    let temp = req.headers.authorization.split(' ');
    let token = temp[1];
    if(!token) {
        res.status(400);
    }
    if(verify(token)){
        next();
    }
}


// middlewares
app.use("/api/admin",admins);
app.use("/api/customers",users);
app.use("/api/bookings",bookings);
app.use('/api',listings);

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Welcome to travelling booking app");
})

app.post('/api/signup',(req,res)=>{
    let body = req.body;
    let user = {
        username:body.user,
        password:body.pass,
        email:body.email
    }
    let token = signer(user);
    fs.readFile('temp.json','utf-8',(err,data)=>{
        data = JSON.parse(data);
        data.push(user);
        fs.writeFile('temp.json',JSON.stringify(data),(err)=>{
            console.log("written");
        });
        res.send(token);
    })

});

app.post('/api/login',validate,(req,res)=>{
    let body = req.body;
    fs.readFile("temp.json",'utf-8',(err,data)=>{
        data = JSON.parse(data);
        let exists = data.find((u)=>(u.username===body.user && u.password===body.pass));
        if(exists){
            let token = signer(body);
            res.send(token);
        }
        else{
            res.status(413).send("User not found");
        }
    });
});

app.listen(process.env.port,()=>{
    console.log("listening");
});

export default validate;