
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/project-1",{
    family:4,
}).then(()=>{console.log("Ha Ji connection sucess!!")})
.catch((err)=>{console.log(err)});