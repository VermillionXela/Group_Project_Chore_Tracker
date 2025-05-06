import User from "../models/user.model.js";
import Job from "../models/job_model.js";

export const createUserJob = async (req, res) => {
    const { title, description, location, userId } = req.body
    try {
        const JOB = await Job.create({ title, description, location, createdBy: userId })
        res.status(201).json(JOB)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const assignJobToUser = async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
        const JOB = await Job.findById(id)
        JOB.assignedTo = userId
        await JOB.save()

        const USER = await User.findById(userId)
        USER.jobs.push(id)
        await USER.save()

        res.status(200).json(JOB)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const getAllJobs = async (req, res) => {
    try {
        const JOBS = await Job.find({ isCompleted: false }).populate('assignedTo')
        res.status(200).json(JOBS)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getUserJobs = async (req, res) => {
    const { userId } = req.params
    try {
        const JOB = await Job.find({ assignedTo: userId, isCompleted: false }).populate('assignedTo')
        res.status(200).json(JOB)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id).populate('createdBy')
        res.status(200).json(job)
    } catch (error) {
        res.status(400).json({ message: 'Job not found', error })
    }
}

export const deleteJobById = async (req, res) => {
    const { id } = req.params
    try {
        const JOB = await Job.findByIdAndDelete(id)
        res.status(202).json(JOB)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateJobById = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const OPTIONS = {
        new: false,
        runValidators: true,
    }
    try {
        const JOB = await Job.findByIdAndUpdate(id, data, OPTIONS)
        res.status(200).json(JOB)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const completeJob = async (req, res) => {
    try {
        const { id } = req.params
        const JOB = await Job.findByIdAndUpdate(id, { isCompleted: true }, { new: true })
        res.status(200).json(JOB)
    } catch (error) {
        res.status(400).json(error)
    }
}
