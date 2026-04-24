const { getSingleBlog, getAllBlogs } = require("../controllers/blog.controller")

const blogRouter = require("express").Router()
blogRouter.route("/getSingleBlog").post(getSingleBlog)
blogRouter.route("/getAllBlogs").get(getAllBlogs)

module.exports = {
    blogRouter
}