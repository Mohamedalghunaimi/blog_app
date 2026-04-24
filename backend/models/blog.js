const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    subTitle :{
        type:String,
        required:true
    },
    image :{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    isPublished :{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const Blog = mongoose.model("Blog",schema)


module.exports = {
    Blog
}