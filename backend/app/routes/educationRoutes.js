import { Router } from "express";
import {
    createEducation,
    deleteEducation,
    fetchEducation,
    updateEducation } from "../controllers/educationController.js"

const router = Router()


// Create Education Entry
router.post("/", createEducation)
// Fetch Education Entries
router.get("/", fetchEducation)
// Update Education Entry
router.patch("/:educationId", updateEducation)
// Delete Education Entry
router.delete("/:educationId", deleteEducation)

export default router
