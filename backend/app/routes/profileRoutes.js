import { Router } from "express";
import {
    fetchAbout,
    fetchProfile,
    fetchProfilePhoto,
    updateAbout,
    updateProfile,
    uploadPicture } from "../controllers/profileController.js"
import upload from "../multerConfig.js"


const router = Router()


// Fetch Profile
router.get("/", fetchProfile)
// Update Profile
router.patch("/", updateProfile)

// Fetch About
router.get("/about", fetchAbout)
// Update About
router.patch("/about", updateAbout)

// Update Profile Image
router.post("/photo", upload.single("file"), uploadPicture)
// Get Profile Image
router.get("/photo", fetchProfilePhoto)


export default router
