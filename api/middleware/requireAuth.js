import { verify } from "jsonwebtoken"
import UserModel from "../models/UserModel.js"


export const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = verify(token, process.env.SECRET)
        req.user = await UserModel.findById(_id).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Invalid Token" })
    }
}