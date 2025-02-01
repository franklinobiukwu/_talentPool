import { Router } from "express"
import {
        createCvSection,
        deleteCvSection,
        fetchCvSections,
        updateCvSections } from "../controllers/cvSectionsController.js"


const router = Router()

// Fetch Sections
router.get("/", fetchCvSections)

// Create Section
router.post("/", createCvSection)

// Update Section
router.patch("/:cvSectionId", updateCvSections)

// Delete Section
router.delete("/:cvSectionId", deleteCvSection)

export default router
