import { Schema, model } from 'mongoose'

const userModel = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required!'],
            minLength: [3, 'First name should be at least 3 characters long!'],
            maxLength: [30, 'First name should not be longer than 30 characters!']
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required!'],
            minLength: [3, 'Last name should be at least 3 characters long!'],
            maxLength: [30, 'Last name should not be longer than 30 characters!']
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address'
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required!"]
        },
        jobs: [{
            type: Schema.Types.ObjectId,
            ref: 'job'
        }]
    }, { timestamps: true }
)

const User = model('user', userModel)

export default User