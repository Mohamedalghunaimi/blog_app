const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { authRouter } = require("./routes/auth.route")
const { commentRouter } = require("./routes/comment.route")
const { adminRouter } = require("./routes/admin.route")
const { blogRouter } = require("./routes/blog.route")
const app = express()
require("dotenv").config()
app.use(cors({
    origin:["http://localhost:3000","http://localhost:5173"],
    credentials:true
}))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/comment",commentRouter)
app.use("/api/admin",adminRouter)
app.use("/api/blog",blogRouter)


app.listen(process.env.PORT,()=> {
    console.log(`welcome from ${process.env.PORT}`)
})
