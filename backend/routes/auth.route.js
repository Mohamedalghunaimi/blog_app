const { register, login, protectRoute, isAuth, logOut } = require("../controllers/auth.controller")

const authRouter = require("express").Router()
authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/isAuth").get(protectRoute,isAuth)
authRouter.route("/logout").get(protectRoute,logOut)

module.exports ={
    authRouter
}