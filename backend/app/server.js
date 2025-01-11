import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose';
import cors from "cors"

import {v2 as cloudinary} from "cloudinary"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Import Routers
import userRouter from "./routes/userRoutes.js"
import authenticationRouter from "./routes/authenticationRoutes.js"

const app = express()
const port = 3000
const connectionString = process.env.CONNECTION_STRING

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use("/", authenticationRouter)
app.use("/user", userRouter)


mongoose.connect(connectionString)
    .then(() => {
    app.listen(port, () => console.log(`Server is running at ${port}!`))
})
    .catch((error) => console.log(`Failed to connect to the database ${error}.`))
