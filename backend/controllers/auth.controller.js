const { main, User } = require("../models/user")
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
require("dotenv").config()

const register = async(req,res,next)=> {
    const {name,email,password} = req.body
    try {
        await main()
        if((!name)||(!email)||(!password)) {
            return res.json({
                success:false,
                message:"missing details"
            })
        }
        const user = await User.findOne({email})
        if(user) {
            return res.json({
                success:false,
                message:"you have already account",
                
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password:hashPassword,
            name
        })
        const savedUser = await newUser.save();
        var token = await jwt.sign({userId:savedUser._id},process.env.jwt_secret1);
        res.cookie("token",token)
        res.json({
            success:true,
            message:"account is created",
            user:savedUser
        })

    } catch (error) {
        console.error(error)
        res.json({
            success:false,
            message:'something went wrong in the server'
        })
        
    }
}

const login = async(req,res,next)=> {
    const {email,password} = req.body
    try {
        await main();
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                success:false,
                message:"invalid inputs"
            })
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match) {
            return res.json({
                success:false,
                message:"inavlid inputs"
            })
        }
        const token = await jwt.sign({userId:user._id,role:user.role},process.env.jwt_secret1)
        res.cookie("token",token)
        res.json({
            success:true,
            message:"your login operation",user
        })

    } catch (error) {
        res.json({
            success:false,
            message:'something went wrong in the server'
        })
    }
}
const protectRoute = async(req,res,next) => {
    const {token} = req.cookies
    try {
        const decoded = await jwt.verify(token,process.env.jwt_secret1)
        if(!decoded) {
            return res.json({
                success:false,
                message:"you are not authorized"
            })
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error(error)
        res.json({
            success:false,
            message:'something went wrong in the server'
        })
        
    }
}
const isAuth = async(req,res)=>{
    const {userId} = req
    try {
        await main()
        const user = await User.findById(userId).select("name role ")
        res.json({
            success:true,
            user
        })
    } catch (error) {
        console.error(error)
        res.json({
            success:false,
            message:"something went wrong in the server"
        })
        
    }
}

const logOut = async (req,res)=> {
    try {
        res.clearCookie("token")
        res.json({
            success:true
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {
    register,login,protectRoute,isAuth,logOut
}