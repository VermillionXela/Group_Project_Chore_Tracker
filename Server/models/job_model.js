import { Schema, model } from 'mongoose';

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required!"],
            minLength: [3, 'Job title should be at least 3 characters long!'],
            maxLength: [30, 'Job title should not be longer than 30 characters!']
        },
        description: {
            type: String,
            required: [true, "Job Description is required!"],
            minLength: [10, 'Job description should be at least 10 characters long!'],
            maxLength: [200, 'Job description should not be longer than 200 characters!']
        },
        location: {
            type: String,
            required: [true, "Location is required!"]
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            default: null
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)
const Job = model('job', jobSchema)

export default Job