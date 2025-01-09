import { Schema, SchemaTypes, model } from "mongoose";
import CvSection from "./cvSectionsModel.js";

const validSections = ["education", "summary", "skills", "certifications"]

const cvBlockSchema = new Schema({
    userId: {
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
cvBlockSchema.index({ userId: 1, section: 1 })

const CvBlock = model("CvBlock", cvBlockSchema)

export default CvBlock
