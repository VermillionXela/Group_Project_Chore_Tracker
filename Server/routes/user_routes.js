import {Router} from 'express'
import { createUser, getAllUsers, getUserById, loginUser } from '../controllers/user.controller.js'


const userRouter = Router()

userRouter.route('/')
    .post( createUser )
    .get( getAllUsers )

userRouter.route('/:id')
    .get( getUserById )

userRouter.route('/login')
    .post( loginUser )
export default userRouter