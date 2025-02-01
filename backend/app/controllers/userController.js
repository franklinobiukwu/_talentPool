import jwt from "jsonwebtoken"
import User from "../models/userModel.js"


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: "3d"})
}

const signupUser = async (req, res) => {
    const { firstName, lastName, email, gender, password, confirmPassword} = req.body

    try{
        const user = await User.signup(firstName, lastName, email, gender, password, confirmPassword)
        // create webtoken
        const token = createToken(user._id)

        res.status(201).json({ _id: user._id, firstName, lastName, email, token })
    } catch (error){
        console.error(error.message)
        res.status(400).json({ error: error.message})
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)
        // create token
        const token = createToken(user._id)

        const firstName = user.firstName
        const lastName = user.lastName

        res.status(200).json({_id: user._id, firstName, lastName, email, token})
    } catch (error){
        res.status(400).json({ error: error.message })
    }
}

// Authenticate Use
const authenticateUser = async (req, res) => {
    const { token } = req.body

    if (!token){
        return res.status(401).json({ error: "Token not provided or invalid format"})
    }
}
export { signupUser, loginUser }
