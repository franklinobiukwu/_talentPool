import { Schema, SchemaTypes, model } from "mongoose";

const skillSchema = new Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    skill: {
        type: String,
        required: true
    },
})

// Add an index for efficient querying by user_id
skillSchema.index({ user_id: 1 })

const Skill = model("Skill", skillSchema)

export default Skill
