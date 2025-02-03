import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import cors from "cors"

import {v2 as cloudinary} from "cloudinary"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Import Routers
import userRouter from "./routes/userRoutes.js"
import authenticationRouter from "./routes/authenticationRoutes.js"
import cookieParser from 'cookie-parser';

const app = express()
const port = 3000
const connectionString = process.env.MONGO_URI

// Middlewares
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["content-type", "Authorization"]
}))
app.use(express.json())

// Routes
app.use("/", authenticationRouter)
app.use("/user", userRouter)


mongoose.connect(connectionString)
    .then(() => {
    app.listen(port, () => console.log(`Server is running at ${port}!`))
})
    .catch((error) => console.log(`Failed to connect to the database ${error}.`))
