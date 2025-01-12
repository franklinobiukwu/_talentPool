import mongoose from "mongoose";
import CvAsset from "../models/cvAssetModel.js";

const createCvAsset = async (req, res) => {
    const { _id: user_id } = req.user
    const {section, content, tags} = req.body

    // Ensure all fields are not empty
    if (!section || !content || !tags) {
        return res.status(400).json({ error: "No empty field allowed"})
    }

    try{
        const newCvAsset = await CvAsset.create({user_id, section, content, tags})
        return res.status(201).json(newCvAsset)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Couldn't create cv asset: ${error.message}` })
    }
}

// FETCH CV ASSET
const fetchCvAssets = async (req, res) => {
    const { _id:user_id } = req.user // Extract user ID from authenticated request

    try{
        // Fetch Cv assets belonging to the user and exclude unnecessary fields
        const cvAssets = await CvAsset.find({ user_id }).select("-__v -createdAt -updatedAt")
        // Respond with the fetched CV assets
        return res.status(200).json(cvAssets)
    }catch(error){
        console.error("Error fetching CV assets:", error)
        return res.status(500).json({ error: `Error fetching CV assets: ${ error.message }` })
    }
}

// Update CV ASSET
const updateCvAsset = async(req, res) => {
    const { _id: user_id } = req.user
    const { cvAssetId } = req.params
    const { section, content, tags } = req.body

    // Validate fields - no empty fields allowed
    if (!section || !content || !tags) {
        return res.status(400).json({ error: "No empty field allowed"})
    }
    // Validate CV asset ID
    if (!mongoose.Types.ObjectId.isValid(cvAssetId)) {
        return res.status(400).json({ error: "Invalid CV asset ID"})
    }

    try{
        // Update the CV asset
        const updatedCvAsset = await CvAsset.findOneAndUpdate(
            {_id: cvAssetId, user_id},
            {section, content, tags},
            {new: true, runValidators: true} // Return the updated document
        )

        // Handle case where CV asset is not found
        if (!updatedCvAsset) {
            return res.status(404).json({ error: "Cv asset not found"})
        }

        // Return with the updated CV asset
        return res.status(200).json(updatedCvAsset)
    }catch(error){
        // Log Errors
        console.error("Error updating CV asset:", error)
        return res.status(500).json({ error: `Couldn't update CV asset: ${error.message}`})
    }
}

// DELETE CV ASSET
const deleteCvAsset = async (req, res) => {
    const { _id: user_id } = req.user
    const { cvAssetId } = req.params

    // Validate CV asset ID
    if (!mongoose.Types.ObjectId.isValid(cvAssetId)) {
        return res.status(400).json({ error: "Invalid CV asset ID"})
    }
    try{
        // Delete CV asset
        const deletedCvAsset = await CvAsset.findOneAndDelete(
            {_id: cvAssetId, user_id}
        )

        // Handle case where CV asset was not found, and therefore not deleted
        if (!deletedCvAsset) {
            return res.status(404).json({ error: "CV asset not found"})
        }

        // Return with deleted CV asset
        return res.status(200).json(deletedCvAsset)
    }catch(error){
        // Log Error
        console.error(`Error deleting CV asset (ID: ${cvAssetId}, User: ${user_id})`, error)
        return res.status(500).json({ error: `Couldn't delete CV asset: ${ error.message }`})
    }
}

// SEARCH CV ASSETS
const searchCvAssets = async (req, res) => {
    const { _id: user_id } = req.user
    const { query } = req.query

    try{
        // Build the search query
        const searchQuery = { user_id }
        if (query) {
            // Match the query against content, section, or tags fields (case-insensitive)
            searchQuery.$or = [
                { content: new RegExp(query,"i") }, // Matches query in content
                { section: new RegExp(query, "i") }, // Matches query in section
                { tags: {$regex: query, $options: "i"} } // Matches query in tags
            ]
        }

        // Perform the search
        const results = await CvAsset.find(searchQuery).select("-__v -createdAt -updatedAt")

        return res.status(200).json(results)
    }catch(error){
        console.error("Error searching CV assets", error)
        return res.status(500).json({ error: `Couldn't search CV assets: ${ error.message }` })
    }
}

export {createCvAsset, fetchCvAssets, updateCvAsset, deleteCvAsset, searchCvAssets }
