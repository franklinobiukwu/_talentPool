import bcrypt from "bcrypt"
import { Schema, model } from "mongoose"
import validator from "validator"

const userSchema = new Schema({
    title: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: "Invalid email format."
        }
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: (phone) => /^\d{10,15}$/.test(phone),
            message: "Invalid phone number format."
        }
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
        set: (value) => value.toLowerCase()
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: "",
        validate: {
            validator: function (value) {
                // if the field is already set, it cannot be updated to an empty value
                return value.trim() === "" || value.trim() !== ""
            },
            message: "About cannot be empty."
        }
    },
    socialMedia: {
        type: [{
            platform: {type: String, required: true},
            handle: {type: String, required: true}
        }]
    }
},
{
    timestamps: true
})

// Static Signup Method
userSchema.statics.signup = async function (firstName, lastName, email, gender, password, confirmPassword) {
    // Validate parameters
    if (!firstName || !lastName || !email || !gender || !password || !confirmPassword) {
        throw Error("All fields must be fielled.")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid.")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough.")
    }

    // Logic to ensure user is unique and password is hashed
    const exists = await this.findOne({email})

    if (exists) {
        throw Error("Email already in use.")
    }

    if (password !== confirmPassword) {
        throw Error("Password does not match.")
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user in database
    const user = await this.create({
        firstName, lastName, email, gender, password: hashedPassword
    })

    return user
}

// Static Login Method
userSchema.statics.login = async function (email, password) {
    // Ensure email and password are not empty
    if (!email || !password) {
        throw Error("All fields must be filled.")
    }

    // Confirm if email exist in database
    const user = await this.findOne({email})
    if (!user) {
        throw Error("Invalid Email")
    }

    // Confirm by matching correct password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Invalid Password")
    }

    return user
}

const User = model("User", userSchema)

export default User 
