const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true    
    },
    content:{
        type:String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

const Comment = mongoose.model("comment",schema) ;
module.exports = {
    Comment
}