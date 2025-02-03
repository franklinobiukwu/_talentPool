import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// Function to generate access token
const createAccessToken = (_id, email) => {
    return jwt.sign(
        {_id, email},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"}
    )
}

// Function to generate refresh token
const createRefreshToken = (_id) => {
    return jwt.sign(
        {_id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d"}
    )
}

const signupUser = async (req, res) => {
    const { firstName, lastName, email, gender, password, confirmPassword} = req.body

    try{
        const user = await User.signup(
            firstName,
            lastName,
            email,
            gender,
            password,
            confirmPassword,
        )
        // create access token
        const accessToken = createAccessToken(user._id, user.email)
        // create refresh token
        const refreshToken = createRefreshToken(user._id)

        // Save refresh token in DB
        user.refreshToken = refreshToken
        await user.save()

        // Send tokens (store refresh token in HTTP-only cookie)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        })

        res.status(201).json({ _id: user._id, firstName, lastName, email, accessToken })
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

        // create access token
        const accessToken = createAccessToken(user._id, user.email)
        // create refresh token
        const refreshToken = createRefreshToken(user._id)

        // Save refreshToken in DB
        user.refreshToken = refreshToken
        await user.save()
        console.log("Saved user and refresh token")

        // Send tokens (Store refresh token in HTTP-only cookie)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        })

        const firstName = user.firstName
        const lastName = user.lastName

        res.status(200).json({_id: user._id, firstName, lastName, email, accessToken})
    } catch (error){
        res.status(400).json({ error: error.message })
    }
}

// Generate new Access Token
const getNewAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" })

    try{
        // Verify Refresh Token
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        // Find user in DB
        const user = await User.findById(decode._id)
        if (!user || user.refreshToken !== refreshToken){
            return res.status(403).json({ message: "Invalid refresh token" })
        }

        // Generate new Access Token
        const accessToken = createAccessToken(user._id, user.email)

        return res.json({ accessToken })
    } catch(error){
        return res.status(403).json({ message: `Invalid refresh token: ${error}` })
    }
}


// Logout User
const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(204)

    // Find user and remove refresh token
    const user = await User.findOne({ refreshToken })
    if (user) {
        user.refreshToken = null
        await user.save()
    }

    // Clear refresh Token from cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })

    return res.json({ message: "Logged out successfully" })
}

export { signupUser, loginUser, getNewAccessToken, logoutUser }
