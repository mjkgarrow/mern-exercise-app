import { Router } from 'express'
import UserModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

const generateJTW = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '2d' })
}


const router = Router()

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)

        const token = generateJTW(user._id)

        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.register(email, password)

        const token = generateJTW(user._id)

        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Delete user
router.delete('/delete', async (req, res) => {
    console.log("delete")
})

export default router
