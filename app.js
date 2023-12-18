const express = require('express');
const  mongoose = require('mongoose');
const app = express();

// const dotenv = require('dotenv');
// dotenv.config({path:'./config.env'})
 require('dotenv').config({path:'./config.env'});

require('./db/conn');
const User = require('./model/usermodel');

app.use(express.json());

app.use(require('./router/router'))
const port = process.env.PORT || 5000; 



//Middleware - 
// const middleware ork= (req,res,next) =>{
//     console.log("Hello my middleware");
//     next();
// }

// app.get('/',(req,res)=>{
//     res.send("hello ji kaise ho, home page");
// });



app.listen(port,()=>{
    console.log(`server at port no ${port}`);
})