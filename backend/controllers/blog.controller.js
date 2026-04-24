const { cloudinary } = require("../middlewares/cloudinary");
const { Blog } = require("../models/blog");
const { main } = require("../models/user");

const addBlog = async(req,res,next) => {
    const image= req.file;
    const {title,subTitle,category,description,isPublished} = req.body;
    if(!title || !subTitle || !category || !description) {
        return {
            success:false,
            message:"missing details"
        }
    }
    const result = await cloudinary.uploader.upload(image.path, {
        folder: 'my_uploads', 
    });
    
    try {
        await main()
        const newBlog = await Blog({
            ...req.body,image:result.secure_url
        })
        const savedBlog = await newBlog.save()
        
        res.json({
            success:true,
            message:"blog is created"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
const getAllBlogs = async(req,res,next)=> {
    try {
        await main()
        const blogs = await Blog.find({})
        res.json({
            success:true,
            blogs
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
}
const removeBlog = async (req,res,next) => {
    const {blogId} = req.body
    try {
        await main();
        const removedBlog = await Blog.findByIdAndDelete(blogId)
        res.json({
            success:true,
            message:false
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
const updateBlog = async(req,res,next) => {
    const {blogId,publish} = req.body
    try {
        await main();
        await Blog.findByIdAndUpdate(blogId,{isPublished:publish})
        res.json({
            success:true,
            message:"blog is updated"
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
const getSingleBlog = async(req,res) => {
    const {blogId} = req.body
    try {
        await main();
        const blog = await Blog.findById(blogId)
        res.json({
            success:true,
            blog
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


module.exports = {
    addBlog,getAllBlogs,removeBlog,updateBlog,getSingleBlog
}