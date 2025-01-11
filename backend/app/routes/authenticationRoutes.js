import { Router } from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = Router()

// Signup route
router.post("/signup", signupUser)

// Login route
router.post("/login", loginUser)


export default router
