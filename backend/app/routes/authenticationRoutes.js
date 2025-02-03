import { Router } from "express";
import {
    loginUser, 
    signupUser, 
    getNewAccessToken, 
    logoutUser } from "../controllers/userController.js";

const router = Router()

// Signup route
router.post("/signup", signupUser)

// Login route
router.post("/login", loginUser)

// Refresh TOken Route
router.post("/refresh", getNewAccessToken)

// Logout
router.post("/logout", logoutUser)

export default router
