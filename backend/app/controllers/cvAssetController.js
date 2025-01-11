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
const fetchCvAsset = async (req, res) => {
    const { _id:user_id } = req.user

    try{
        const cvAssets = await CvAsset.find({ user_id }).select("-__v")
        return res.status(200).json(cvAssets)
    }catch(error){
        console.error(error)
        return res.status(400).json({ error: `Error fetching CV assets: ${ error.message }` })
    }
}

export {createCvAsset, fetchCvAsset}
