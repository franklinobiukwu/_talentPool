import { model, Schema, SchemaTypes } from "mongoose";

const educationSchema = new Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    certification: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return !this.endDate || value <= this.endDate
            },
            message: "starDate must be earlier than endDate."
        }
    },
    endDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return !this.inView || value == null
            },
            message: "endDate should be empty if inviw is true."
        }
    },
    inView: {
        type: Boolean,
        required: true
    },
    otherInfo: {
        type: [
            {
                key: {type: String, required: true},
                value: { type: String, required: true}
            }]
    }
}, {timestamps: true})

educationSchema.index({ user_id: 1 })

const Education = model("Education", educationSchema)

export default Education
