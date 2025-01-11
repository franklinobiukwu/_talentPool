import { Schema, SchemaTypes, model } from "mongoose";
import CvSection from "./cvSectionsModel.js";

const validSections = ["education", "summary", "skills", "certifications", "experience"]

const cvAssetSchema = new Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    section: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Uncomment when the admin feature is ready
                //const cvSection = await CvSection.findOne({ sections: value });
                //return !!cvSection;
                return validSections.includes(value)
            },
            message: (props) => `${props.value} is not a valid section.`
        }
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        validate: {
            validator: (tags) => tags.length <= 10,
            message: "You can add a maximum of 10 tags"
        }
    }
}, {timestamps: true})

// indexing
cvAssetSchema.index({ user_id: 1, section: 1 })

const CvAsset = model("CvAsset", cvAssetSchema)

export default CvAsset
