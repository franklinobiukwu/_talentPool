import {v2 as cloudinary} from 'cloudinary'
import User from "../models/userModel.js";
import fs from "fs"


// Fetch About
const fetchAbout = async (req, res) => {
    const { _id } = req.user

    try{
        const about = await User.findById({_id}).select("about -_id")

        return res.status(200).json(about)
    }catch(error){
        return res.status(400).json({error: `Couldn't fetch about. ${error}`})
    }
}

// Update About
const updateAbout = async (req, res) => {
    const { about } = req.body

    if (!about) {
        return res.status(400).json({error: "About is required."})
    }

    const { _id } = req.user

    try{
        const updatedAbout = await User.findByIdAndUpdate(
            {_id}, { about }, {new: true}
        ).select("about -_id")
        
        return res.status(200).json(updatedAbout)

    }catch(error){
        return res.status(400).json({error: `Error updating about field ${error.message}`})
    }
}

// Fetch Profile
const fetchProfile = async (req, res) => {
    const { _id } = req.user

    try{
        const profile = await User.findById({_id})
            .select("-password -about -photo -socialMedia -createdAt -updatedAt -title -__v -_id")

        return res.status(200).json(profile)
    }catch(error){
        return res.status(400).json({ error: `Couldn't fetch profile. ${error.message}`})
    }
}

// Update Profile
const updateProfile = async (req, res) => {
    const profile = req.body
    console.log({profile})

    // return if profile is empty
    if (!profile) {
        return res.status(400).json({error: "Profile cannot blank"})
    }

    // return if required fields are blank
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.gender || !profile.country || !profile.state || !profile.city){
        return res.status(400).json({error: "Please fill all required fields"})
    }
    const { _id } = req.user

    try{
        const updatedProfile = await User.findByIdAndUpdate(
            {_id}, {...profile}, {new: true}
        ).select(Object.keys(profile).join(" "))
        console.log({updatedProfile})

        return res.status(200).json(updatedProfile)
    }catch(error){
        return res.status(400).json({error: `Error updating profile ${error.message}`})
    }
}

// Update Profile Image
const uploadPicture = async (req, res) => {
    try{
        const { _id } = req.user
        const file = req.file
        console.log({file})

        if (!file) {
            return res.status(400).json({error: "No file uploaded"})
        }

        // Check if the file exists
        if (!fs.existsSync(file.path)) {
            return res.status(500).json({error: "File was not saved"})
        }

        // Upload the file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "user_pictures",
            transformation: [
                {width: 500, height: 500, crop: "fill", gravity: "auto"},
                {fetch_format: "auto", quality: "auto"} // Optimise delivery
            ]
        })

        // Check if the upload was successful
        if (!uploadResult || !uploadResult.secure_url){
            throw new Error("Failed to upload image to Cloudinary")
        }

        // Update the user's profile with the new picture URL
        await User.findByIdAndUpdate(_id, { photo: uploadResult.secure_url})

        // Respond with the uploaded image url
        res.status(200).json({
            message: "Profile picture uploaded successfully",
            url: uploadResult.secure_url
        })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: "An error occurred while uploading the picture"})
    }
}

// Fetch Profile Picture
const fetchProfilePhoto = async (req, res) => {
    const { _id } = req.user

    try{
        const pictureUrl = await User.findById({_id}).select("photo")
        return res.status(200).json(pictureUrl)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Error fetching profile photo ${error.message}`})
    }
}

export {updateAbout, updateProfile, fetchAbout, fetchProfile, uploadPicture, fetchProfilePhoto}
