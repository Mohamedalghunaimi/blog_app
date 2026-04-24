const { protectRoute } = require("../controllers/auth.controller");
const { addComment, getBlogComments, removeCommentForUser } = require("../controllers/comment.controller");

const commentRouter = require("express").Router();
commentRouter.route("/add").post(protectRoute,addComment)
commentRouter.route("/getAllComments").post(getBlogComments)
commentRouter.route("/removeByUser").post(protectRoute,removeCommentForUser)
module.exports = {
    commentRouter
}