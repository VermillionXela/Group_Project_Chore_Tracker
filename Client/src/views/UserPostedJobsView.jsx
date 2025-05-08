import { useEffect, useState } from 'react'
import { useAuth } from '../Auth/useAuth'
import { getUserPostedJobs, deleteJobById } from '../Services/Job_Services'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import styles from '../css/UserPostedJobsView.module.css'

export const UserPostedJobsView = () => {
    const { user } = useAuth()
    const _id = user._id
    const navigate = useNavigate()

    const [postedJobs, setPostedJobs] = useState([])

    useEffect(() => {
        if (_id) {
            getUserPostedJobs(_id)
                .then(setPostedJobs)
                .catch(console.error)
        }
    }, [_id])

    const handleDelete = async (jobId) => {
        try {
            await deleteJobById(jobId)
            const updated = await getUserPostedJobs(_id)
            setPostedJobs(updated)
        } catch (error) {
            console.error('Failed to delete job:', error)
        }
    }

    return (
        <>
            <Header />

            <div className={styles.main}>
                <h1 className={styles.tableHeader}>My Posted Jobs</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Location</th>
                            <th>Taken By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postedJobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.title}</td>
                                <td>{job.location}</td>
                                <td className={!job.assignedTo ? styles.notTaken : ''}>
                                    {job.assignedTo ? job.assignedTo.firstName : 'Not Taken'}
                                </td>
                                <td>
                                    <button onClick={() => navigate(`/jobs/${job._id}/edit`)}>Edit</button>
                                    {' | '}
                                    <button onClick={() => handleDelete(job._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


