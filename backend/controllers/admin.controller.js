var jwt = require('jsonwebtoken');
const {main2} = require("../middlewares/gemini")
require("dotenv").config()
const loginAsAdmin = async(req,res,next)=> {
    const {email,password} = req.body
    console.log({email,password})
    try {
        if((!email)||(!password)) {
            return res.json({
                success:false,
                message:"missing details"
            })
        }
        if((email!==process.env.admin_email)||(password!==process.env.admin_password)) {
            return res.json({
                success:false,
                message:"wrong details"
            })        
        }
        if((email===process.env.admin_email)&&(password===process.env.admin_password)) {
            const token = await jwt.sign({email},process.env.jwt_secret2)
            res.cookie("adminToken",token)
            return res.json({
                success:true,
                message:"you are the admin"
            })
        }
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const isAdmin = async(req,res,next)=> {
    const {adminToken} = req.cookies;
        if(!adminToken) {
            return res.json({
                success:false,
                message:"you are not authorized"
            })
        }
    try {
        const decodedToken = await jwt.verify(adminToken,process.env.jwt_secret2)
        req.adminEmail = decodedToken.email;
        next()
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"unauthorized"
        })
    }
}
const logout = async(req,res) => {
    const {adminToken} = req.cookies;


    if(!adminToken) {
        return res.json({
            success:false,
            message:"you are not authorized"
        })
    }
    try {
        res.clearCookie("adminToken")
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

const verifyIsAdmin = async(req,res,next)=> {
    try {
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
const generateContent = async(req,res)=> { 
    const {title} = req.body;

    try {

        const content = await main2(title)
        res.json({
            success:true,
            content
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
    loginAsAdmin,isAdmin,verifyIsAdmin,logout,generateContent
}