import mongoose from "mongoose";
import Skill from "../models/skillsModel.js";

// Create Skill
const createSkill = async (req, res) => {
    const { _id: user_id } = req.user
    const { skill } = req.body

    // If skill is empty
    if (!skill) {
        return res.status(400).json({ error: "Skill cannot be empty"})
    }


    try{
        // Create Skill
        const newSkill = await Skill.create({user_id, skill})

        return res.status(201).json(newSkill)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Error creating skills ${error.message}` })
    }
}

// Fetch Skills
const fetchSkills = async (req, res) => {
    const { _id: user_id } = req.user
    
    try{
        const skills = await Skill.find({user_id}).select("-__v")
        return res.status(200).json(skills)
    }catch(error) {
        console.error(error)
        return res.status(400).json({ error: `Error fetching skills ${error.message}`})
    } 
}

// Update Skill
const updateSkill = async (req, res) => {
    const { _id: user_id } = req.user
    const { skillId } = req.params
    const { skill } = req.body

    // Validate Skill id
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        return res.status(400).json({ error: "Invalid skill ID" })
    }

    try{
        const updatedSkill = await Skill.findOneAndUpdate(
            {_id:skillId, user_id},
            {skill},
            {new: true}
        )
        
        return res.status(200).json(updatedSkill)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Error updating skill: ${error.message}`})
    }
}

// Delete Skill
const deleteSkill = async (req, res) => {
    const {_id: user_id} = req.user
    const { skillId } = req.params

    // Validate Skill id
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
        return res.status(400).json({ error: "Invalid skill ID"})
    }

    try{
        const deletedSkill = await Skill.findOneAndDelete({_id: skillId, user_id})

        // if no skill was found and deleted
        if (!deletedSkill) {
            return res.status(404).json({ error: "Skill not found or does not belong to this user"})
        }

        return res.status(200).json(deletedSkill)
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: `Error deleting skill: ${error.message}` })
    }
}

export { createSkill, fetchSkills, updateSkill, deleteSkill }
