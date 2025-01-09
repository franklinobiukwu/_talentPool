import mongoose from "mongoose";
import Education from "../models/educationModel.js";

// Create Education Entries
const createEducation = async (req, res) => {
    const { _id } = req.user
    const educationDetails = req.body

    if (!educationDetails) {
        return res.status(400).json({error: "Education details are required"})
    }

    try{
        const newEducation = await Education.create({user_id:_id, ...educationDetails})
        return res.status(201).json(newEducation)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Error creating education entry ${error}`})
    }
}

// FETCH EDUCATION ENTRIES
const fetchEducation = async (req, res) => {
    const { _id } = req.user

    try{
        const educationList = await Education.find({user_id: _id})
        return res.status(200).json(educationList)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Error fetching eduction information ${error.message}`})
    }
}

// UPDATE EDUCATION ENTRY
const updateEducation = async (req, res) => {
    const { _id: user_id } = req.user
    const educationDetails = req.body
    const { education_id } = req.params

    // Return error if education id is invalid
    if (!mongoose.Types.ObjectId.isValid(education_id)) {
        return res.status(404).json({ error: "Education entry does not exist"})
    }
    // Return error if fields are empty
    if (!educationDetails) {
        return res.status(400).json({ error: "Fields cannot be empty"})
    }

    try{
        // Update education where user_id and _id match
        const updatedEducation = await Education.findOneAndUpdate(
            {_id: education_id, user_id},
            {...educationDetails},
            {new: true}
        ).select("-createdAt -updatedAt -__v")

        // Check if the education entry was found and update
        if (!updatedEducation) {
            return res.status(404).json({ error: "Education entry not found"})
        }

        res.status(200).json(updatedEducation)
    }catch(error){
        console.error(error)
        res.status(400).json({ error: `Couldn't update education entry ${error.message}`})
    }
}

// DELETE EDUCATION ENTRY
const deleteEducation = async (req, res) => {
    const { _id: user_id } = req.user
    const { education_id } = req.params

    // Return error if education id is invalid
    if (!mongoose.Types.ObjectId.isValid(education_id)) {
        return res.status(404).json({ error: "Education entry does not exist"})
    }

    try{
        const deletedEducation = await Education.findOneAndDelete(
            {_id: education_id, user_id},
        )

        // If no document was found
        if (!deletedEducation) {
            return res.status(404).json({ error: "Education entry not found"})
        }

        res.status(200).json({ message: "Education entry successfully deleted", deletedEducation})
    }catch(error){
        console.error(error)
        res.status(400).json({ json: `Error deleting education ${error.message}`})
    }
}

export { createEducation, fetchEducation, updateEducation, deleteEducation}
