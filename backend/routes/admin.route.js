const { loginAsAdmin, verifyIsAdmin, isAdmin, logout, generateContent } = require("../controllers/admin.controller");
const { isAuth } = require("../controllers/auth.controller");
const { addBlog, getAllBlogs, removeBlog, updateBlog } = require("../controllers/blog.controller");
const { getAllComments, removeCommentForUser, removeCommentForAdmin, updateComment } = require("../controllers/comment.controller");
const { upload } = require("../middlewares/multer");

const adminRouter = require("express").Router();
adminRouter.route("/login").post(loginAsAdmin)
adminRouter.route("/isAuth").get(isAdmin,verifyIsAdmin)
adminRouter.route("/logout").get(isAdmin,logout)
adminRouter.route("/getAllComments").get(isAdmin,getAllComments)
adminRouter.route("/deleteComment").post(isAdmin,removeCommentForAdmin)
adminRouter.route("/updateComment").post(isAdmin,updateComment)
adminRouter.route("/addBlog").post(isAdmin,upload.single("image1"),addBlog)
adminRouter.route("/getAllBlogs").get(isAdmin,getAllBlogs)
adminRouter.route("/removeBlog").post(isAdmin,removeBlog)
adminRouter.route("/updateBlog").post(isAdmin,updateBlog)
adminRouter.route("/generateContent").post(isAdmin,generateContent)


module.exports = {
    adminRouter
}