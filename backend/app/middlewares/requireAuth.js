import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Shocks! You are not authorized to view this page."})
    }
    
    // Split authorization header to get token
    const token = authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: "Token not provided or invalid format"})
    }

    try{
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findOne({_id})
        next()
    }catch(error){
        res.status(401).json({
            error: `Unauthorized Request! ${error.message}`
        })
    }
}

export default requireAuth
