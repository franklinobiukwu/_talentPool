import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { fetchAbout, fetchProfile, fetchProfilePhoto, updateAbout, updateProfile, uploadPicture } from "../controllers/profileController.js"
import upload from "../multerConfig.js"


const router = Router()

// Authenticate user to access all profile routes
router.use(requireAuth)

// Fetch About
router.get("/about", fetchAbout)
// Update About
router.patch("/about", updateAbout)
// Fetch Profile
router.get("/profile", fetchProfile)
// Update Profile
router.patch("/profile", updateProfile)
// Update Profile Image
router.post("/photo", upload.single("file"), uploadPicture)
// Get Profile Image
router.get("/photo", fetchProfilePhoto)


export default router
