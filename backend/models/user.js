const mongoose = require("mongoose")
require("dotenv").config()
const main = async()=> {
    await mongoose.connect(process.env.db_url)
}

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        isEmail:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:"string",
        enum:["admin","user"],
        default:"user"
    }
})

const User = mongoose.model('User',schema)

module.exports={
    main,User
}