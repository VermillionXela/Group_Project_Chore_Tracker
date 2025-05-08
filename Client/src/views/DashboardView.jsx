import { useEffect, useState } from 'react'
import { getAllJobs, getUserJobs, completeJobById, assignJobToUser, deleteJobById } from '../Services/Job_Services'
import { Header } from '../components/Header'
import styles from '../css/Dashboard.module.css'
import { useAuth } from '../Auth/useAuth'
import { useNavigate } from 'react-router-dom'


export const Dashboard = () => {
    const { user } = useAuth()
    const [allJobs, setAllJobs] = useState([])
    const [myJobs, setMyJobs] = useState([])

    const userObject = JSON.parse(localStorage.getItem('user') || '{}')
    const _id = userObject?._id
    const navigate = useNavigate()

    useEffect(() => {
        getAllJobs()
            .then(setAllJobs)
            .catch(console.error)
        getUserJobs(_id)
            .then(setMyJobs)
            .catch(console.error)
    }, [_id])

    const handleCompleteJob = async (jobId) => {
        try {
            await completeJobById(jobId)
            setMyJobs(myJobs.filter(job => job._id !== jobId))
        } catch (error) {
            console.error('Failed to complete job', error)
        }
    }

    const handleAssign = async (jobId) => {
        try {
            await assignJobToUser(jobId, _id)
            const updated = await getUserJobs(_id)
            setMyJobs(updated)
            setAllJobs(prev =>
                prev.map(job => job._id === jobId ? { ...job, assignedTo: _id } : job)
            )
        } catch (error) {
            console.error('Failed to assign job:', error)
        }
    }

    const handleDelete = async (jobId) => {
        try {
            await deleteJobById(jobId)
            const updatedJobs = await getAllJobs()
            setAllJobs(updatedJobs)

            const updatedMyJobs = await getUserJobs(user._id)
            setMyJobs(updatedMyJobs)
        } catch (error) {
            console.error('Failed to delete job:', error)
        }
    }




    return (
        <>
            <Header />
            
            <div className={styles.dashboard}>
            <h1 className={styles.pageTitle}>Chore Tracker Dashboard</h1>
                <div className={styles.jobTables}>
                    <div>
                        <h2 className={styles.tableHeader}>All Jobs</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allJobs.map((job) => (
                                    <tr key={job._id}>
                                        <td>{job.title}</td>
                                        <td>{job.location}</td>
                                        <td>
                                            <button onClick={() => navigate(`/jobs/${job._id}`)} className={styles.button}>View</button>
                                            {job.createdBy === user._id && (
                                                <>
                                                    {' | '}
                                                    <button onClick={() => navigate(`/jobs/${job._id}/edit`)} className={styles.button}>Edit</button>
                                                    {' | '}
                                                    <button onClick={() => handleDelete(job._id)}>Delete</button>
                                                </>
                                            )}
                                            {job.assignedTo === null && job.createdBy !== user._id && (
                                                <>
                                                    {' | '}
                                                    <button onClick={() => handleAssign(job._id)}>Add</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h2 className={styles.tableHeader}>My Jobs</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myJobs.map((job) => (
                                    <tr key={job._id}>
                                        <td>{job.title}</td>
                                        <td>
                                            <button onClick={() => navigate(`/jobs/${job._id}`)} className={styles.button}>View</button>
                                            {' | '}
                                            <button className={styles.completeBtn} onClick={() => handleCompleteJob(job._id)}>Done</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}

