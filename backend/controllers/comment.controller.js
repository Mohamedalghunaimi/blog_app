const { Comment } = require("../models/comment");
const { main, User } = require("../models/user");

const addComment = async(req,res,next)=> {
    const {userId} = req
    const {blogId,content} = req.body
    try {
        await main();
        const newComment= new Comment({
            userId,
            blogId,
            content
        })
        const savedComment = await newComment.save();
        res.json({
            success:true,
            message:"comment is saved"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const removeCommentForAdmin = async (req,res,next)=> {
    const {commentId} = req.body
    const userId = req.user.userId;
    try {
        await main();
        const user = await User.findById(userId);
        if(comment.userId!==userId || user.role!=='admin') {
            return res.json({
                success:false,
                message:"unauthorized"
            })
        }
        const comment = await Comment.findByIdAndDelete(commentId);


        res.json({
            success:true,
            message:"comment is deleted"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })    
    }
}

const removeCommentForUser =async(req,res,next)=> {
    const {commentId} = req.body
    const {userId} = req
    
    try { 
        await main();
        const existingCommit = await Comment.findById(userId);
        if(!existingCommit) {
            return res.json({
                success:false,
                message:"commit not found"
            })
        }
        if(commentId!==existingCommit.userId) {
            return res.json({
                success:false,
                message:"forbidden"
            })
        }

        await Comment.findByIdAndDelete(commentId)
        res.json({
            success:true,
            message:"comment is deleted"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }

}
const updateComment = async(req,res,next)=> {
    const {commentId,approved=false} = req.body;
    if(!commentId) {
        return res.json({
            success:false,
            message:"missing details"
        })
    }
    try {
        await main()
        const newComment = await Comment.findByIdAndUpdate(commentId,{isApproved:approved})
        res.json({
            success:true,
            messsage:"done"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


const getBlogComments = async(req,res,next) => {
    const {blogId} = req.body
    try {
        await main();
        const comments = await Comment.find({blogId}).populate("userId")
        res.json({
            success:true,
            comments
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
const getAllComments = async (req,res,next)=> {
    try {
        await main()
        const comments = await Comment.find({}).populate('userId').populate("blogId")
        console.log(comments)
        res.json({
            success:true,
            comments
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {
    removeCommentForAdmin,
    addComment,removeCommentForUser,getBlogComments,getAllComments,updateComment
}