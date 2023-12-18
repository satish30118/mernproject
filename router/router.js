const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
router.use(cookieParser())
const authenticate = require("../middleware/authenticate")
require('../db/conn');
// require('dotenv').config();
const User = require('../model/usermodel');


//FOR REGISTRATION//

router.post('/register',(req,res)=>{
   const {name, email, phone, work, password, cpassword} = req.body;

   if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json("Empty field check properly");
   }

   User.findOne({email:email})
   .then((userExist)=>{
    if(userExist){
        return res.status(422).json("Email Already Exist");
    }

    //checking password and confirm password should same //
    if(password!=cpassword){
        return res.status(400).json("Password and confirm password not match")
    }

    // const user = new User(req.body)
    //user creation
    const user = new User({name, email, phone, work, password, cpassword:undefined})
    
    user.save().then(()=>{
        return res.status(201).json("user registered successfuly")
    }).catch((err)=>{console.log(err)})
    
   }).catch((err)=>{console.log(err)})
});




// FOR LOGIN //

router.post('/login',async(req,res)=>{

    try{
        //getting value by destruring
        const {email, password} = req.body;
    
        //validation for empty data
        if(!email || !password){
        //    return res.status(400).json({error:"fill empty data"})
           return res.status(400).json("fill empty data")
        }
        const userLogin = await User.findOne({email:email});
        if(userLogin){
            const isPassMatch = await bcrypt.compare(password,userLogin.password);
   //genrate token and store
            const token = await userLogin.generateAuthToken();
            console.log("TOKEN:"+token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+600000),
                httpOnly:true,
            })
            
            if(isPassMatch){
                // return res.status(201).json({message:"Login successful!!"});
                return res.status(201).json("Login successful!!");
            }else{
                return res.status(400).json("Invalide Creational");
            }
        }else{
            return res.status(400).json("Invalide Creational");
        }

    
}catch(err){console.log(err)};

});


//ABOUT PAGE

router.get('/about',authenticate,(req,res) =>{
    console.log("Hello my middleware");
    res.send(req.rootUser);
});


//GETDATA FOR HOME AND CONTACT
router.get('/getdata',authenticate,(req,res) =>{
    // console.log("Hello my middleware from getdata");
    res.send(req.rootUser);
});

/// CONTACT PAGE 
router.post("/contact", async(req,res) => {
    try{
        const {name, email, phone, message} = req.body;
        if(!name || !email || !phone || !message){
            console.log("Empty data")
            return res.json({error:"Empty data"})
        }
        const userContact = await User.findOne({email})
        if(userContact){
            const userMessage = await userContact.addMessage({name, email, phone, message});
            await userContact.save();
            console.log("msg save")
            res.status(201).json({message:"User message save sucessfully"});
        }else{
            res.status(422).json({message:"User have't register"})
        }
    }catch (err) {
        console.log(err);
    }
})




module.exports = router;