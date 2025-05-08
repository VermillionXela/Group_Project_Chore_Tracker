import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const password2 = await bcrypt.hash(password, salt)

    try {
        const USER = await User.create({ firstName, lastName, email, password: password2 })
        res.status(201).json(USER)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const USERS = await User.find()
        res.status(200).json(USERS)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const USER = await User.findById(id)
        res.status(200).json(USER)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const loginUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        const decode = await bcrypt.compare(req.body.password, user.password)
        if (!decode) {
            res.status(401).json(error)
        }
        res.json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                email: user.email
            }
        })
    }catch(error){
        res.status(500).json(error)
    }
}

