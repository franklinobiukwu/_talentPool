import { Schema, SchemaTypes, model } from "mongoose";

const cvSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: [{
            section: String,
            value: [String]
        }],
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
}, {timestamps: true})

const Cv = model("Cv", cvSchema)

export default Cv
