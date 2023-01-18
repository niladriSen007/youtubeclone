import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fs from "fs"
import path from "path"
import userRoutes from "./router/users.js"
import videoRoutes from "./router/videos.js"
import commentRoutes from "./router/comments.js"
import authRoutes from "./router/auth.js"

const __dirname = path.resolve();
dotenv.config({path:"./.env"})
const PORT = process.env.PORT || 5000;
const app=express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//using routers
app.use("/users",userRoutes)
app.use("/comments",commentRoutes)
app.use("/videos",videoRoutes)
app.use("/auth",authRoutes)


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

import "./database/connection.js"

app.listen(PORT,()=>{
    console.log("Server is running")
})