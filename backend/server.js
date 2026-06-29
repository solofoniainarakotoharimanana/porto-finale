import express from "express"

import authRoutes from "./routes/authRoutes.js"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/userRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import requestRoute from "./routes/requestRoute.js"

const app = express()

// This MUST be placed before your route definitions
app.use(cookieParser()); //GET INFO FROM COOKIE
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your exact frontend URL
    credentials: true 
}));

app.use(express.json());//TO PARSE req.body

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/request", requestRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    connectDB()
    console.log("Server running on port 5000 ...")
})