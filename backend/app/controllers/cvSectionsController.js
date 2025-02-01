import mongoose from "mongoose";
import CvSection from "../models/cvSectionsModel.js";


const createCvSection = async (req, res) => {
    const {_id: user_id } = req.user

    const { sectionName } = req.body
    console.log(req.body)

    // Ensure SectionName is not empty
    if (!sectionName){
        return res.status(400).json({error: "Section name is required"})
    }

    try{
        const newCvSection = await CvSection.create({ user_id, sectionName })

        // Convert the document to an object and exclude unwanted fields
        const {__v, user_id: _, ...responseData} = newCvSection.toObject()

        return res.status(201).json(responseData)
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: `Couldn't create CV section: ${error.message}`})
    }
}

const fetchCvSections = async (req, res) => {
    const { _id:user_id  }= req.user

    try{
        const sections = await CvSection.find({user_id}).select("-__v -user_id")
        return res.status(200).json(sections)
    }catch(error){
        console.error("Error fetching CV assets:", error)
        return res.status(500).json({error: `Error fetching CV sections: ${error.message}`})
    }
}

const updateCvSections = async (req, res) => {
    const { _id: user_id } = req.user
    const { cvSectionId } = req.params
    const { sectionName } = req.body

    // Validate fields
    if (!sectionName){
        res.status(400).json({ error: "Section name is requires"})
    }

    // Validate CV Section ID
    if (!mongoose.Types.ObjectId.isValid(cvSectionId)) {
        return res.status(400).json({ error: "Invalid CV section ID"})
    }

    try{
        const updatedCvSection = await CvSection.findOneAndUpdate(
            { _id: cvSectionId, user_id },
            {sectionName},
            { new: true }
        ).select("-__v -user_id")

        // Handle case where CVAsset is not found
        if (!updatedCvSection) {
            return res.status(404).json({ error: "CV section not found"})
        }

        // Return Updated CV Section
        return res.status(200).json(updatedCvSection)
    }catch(error){
        console.error("Error updating CV section:", error)
        return res.status(500).json({ error: `Couldn't update CV section: ${error.message}`})
    }
}

// Delete CV Section
const deleteCvSection = async (req, res) => {
    const { _id: user_id } = req.user
    const { cvSectionId } = req.params

    // Validate CV section ID
    if (!mongoose.Types.ObjectId.isValid(cvSectionId)) {
        return res.status(400).json({ error: "Invalid CV section ID"})
    }

    try{
        // Delete CV Section
        const deletedCvSection = await CvSection.findOneAndDelete(
            { _id:cvSectionId, user_id}
        )

        // Handle case where CV Section was not found, and therefore not deleted
        if (!deleteCvSection) {
            return res.status(404).json({ error: "CV section not found"})
        }

        // Return with deleted CV Section
        return res.status(200).json(deletedCvSection)
    }catch(error){
        console.error(`Error deleting CV section (ID: ${cvSectionId}, User: ${user_id})`, error)
        return res.status(500).json({ error: `Couldn't delete CV section: ${error.message}`})
    }
}


export { createCvSection, fetchCvSections, updateCvSections, deleteCvSection }
