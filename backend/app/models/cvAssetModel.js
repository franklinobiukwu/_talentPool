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

// Pre-save middleware to normalize section
cvAssetSchema.pre("save", function(next) {
    if (this.section) {
        this.section = this.section.toLowerCase()
    }
    next()
})

// Pre-update middleware to normalize section during updates
cvAssetSchema.pre("findOneAndUpdate", function(next) {
    if (this._update.section) {
        this._update.section = this._update.section.toLowerCase()
    }
    next()
})

// indexing
cvAssetSchema.index({ user_id: 1, section: 1 })

const CvAsset = model("CvAsset", cvAssetSchema)

export default CvAsset
