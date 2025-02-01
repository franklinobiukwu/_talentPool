import { Schema, SchemaTypes, model } from "mongoose";


// Sub-schema for history
const historySchema = new Schema({
    updatedBy: {
        type: SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
},
{ _id: false } // Prevents creation of extra _id for sub-documents
)

const cvSectionSchema = new Schema({
    sections: {
        type: [String],
        validate: {
            validator: (sections) => {
                return new Set(sections).size === sections.length // Check uniqueness
            },
            message: "Section must be unique."
        }
    },
    history: {
        type: [historySchema],
        default: [],
        required: true
    }
}, { timestamps: true })

// index sections
cvSectionSchema.index({ sections: 1})

const CvSection = model("CvSection", cvSectionSchema)

export default CvSection
