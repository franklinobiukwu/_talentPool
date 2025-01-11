import { Router } from "express";
import {
    createSkill,
    deleteSkill,
    fetchSkills,
    updateSkill } from "../controllers/skillController.js"


const router = Router()

// Create Skills
router.post("/", createSkill)
// Fetch Skills
router.get("/", fetchSkills)
// Update Skills
router.patch("/:skillId", updateSkill)
// Delete Skills
router.delete("/:skillId", deleteSkill)


export default router
