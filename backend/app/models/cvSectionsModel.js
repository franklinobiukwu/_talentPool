import { Schema, SchemaTypes, model } from "mongoose";

const cvSectionSchema = new Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    sectionName: {
        type: String,
        required: true,
        set: (value) => value.toLowerCase() // convert to lowercase before saving
    },
})

// Add an index for efficient querying by user_id
cvSectionSchema.index({ user_id: 1, sectionName: 1 }, { unique: true })

const CvSection = model("CvSection", cvSectionSchema)

export default CvSection
