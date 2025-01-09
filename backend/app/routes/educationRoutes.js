import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { createEducation, fetchEducation, updateEducation } from "../controllers/educationController.js"

const router = Router()

// Authenticate User
router.use(requireAuth)

// Create Education Entry
router.post("/", createEducation)
// Fetch Education Entries
router.get("/", fetchEducation)
// Update Education Entry
router.patch("/:education_id", updateEducation)
// Delete Education Entry

export default router
