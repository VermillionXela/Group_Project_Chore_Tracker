import {Router} from 'express'
import { assignJobToUser, createUserJob, deleteJobById, getAllJobs, getJobById, getUserJobs, updateJobById } from '../controllers/job_controller.js'

const jobRouter = Router()

jobRouter.route('/')
    .get( getAllJobs )

jobRouter.route('/job/:id')
    .get( getJobById )
    .delete( deleteJobById )
    .put( updateJobById )
    
jobRouter.route('/claim/:id')
    .put( assignJobToUser )

jobRouter.route('/:userId')
    .post( createUserJob )
    .get( getUserJobs )

export default jobRouter

