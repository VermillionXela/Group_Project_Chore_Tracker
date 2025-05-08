import { Router } from 'express'
import { assignJobToUser, createUserJob, deleteJobById, getAllJobs, getJobById, getUserJobs, updateJobById, completeJob,getJobsCreatedByUser } from '../controllers/job_controller.js'

const jobRouter = Router()

jobRouter.route('/')
    .get(getAllJobs)
    .post(createUserJob)

jobRouter.route('/:userId')
    .get(getUserJobs)

jobRouter.route('/posted/:userId')
    .get(getJobsCreatedByUser)

jobRouter.route('/job/:id')
    .get(getJobById)
    .delete(deleteJobById)
    .put(updateJobById)

jobRouter.route('/assign/:id')
    .put(assignJobToUser)

jobRouter.route('/complete/:id')
    .put(completeJob)


export default jobRouter

