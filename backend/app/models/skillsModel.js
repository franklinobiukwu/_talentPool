import { Schema, SchemaTypes, model } from "mongoose";

const skillSchema = new Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    skills: {
        type: [String],
        validate: function (skills) {
            return new Set(skills).size === skills.length
        },
        message: "Skill must be unique."
    },
    default: []
})

// Add an index for efficient querying by user_id
skillSchema.index({ user_id: 1 })

const Skill = model("Skill", skillSchema)

export default Skill
