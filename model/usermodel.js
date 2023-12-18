const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:Number,
    work:String,
    password:String,
    cpassword:String,
    date:{
        type:Date,
        default:Date.now,
    },

    messages:[
        {
            name:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
            },
            phone:Number,
            message:{
                type:String,
                required:true,
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
});

//HASHING PASSWORD
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        // this.cpassword = await bcrypt.hash(this.cpassword,10); //no need beacause we dont store cpassword
    }
    next();
})

// GENRATING UNIQUE TOKEN FOR AUTH
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

//ADDING MESSAGE DATA
userSchema.methods.addMessage = async function(name, email, phone, message){
    try{
        this.messages = this.messages.concat(name, email, phone, message)
        await this.save();
        return this.messages;

    }catch (err){
        console.log(err)
    }
}

const User = new mongoose.model("User",userSchema);

module.exports = User;