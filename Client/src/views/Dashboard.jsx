import { useEffect, useState } from 'react'
import { getAllJobs, getUserJobs } from '../Services/Job_Services'
import { Header } from '../components/Header'
import styles from '../css/Dashboard.module.css'
import { useAuth } from '../Auth/useAuth'

export const Dashboard = () => {
    const { user } = useAuth()
    const [allJobs, setAllJobs] = useState([])
    const [myJobs, setMyJobs] = useState([])

    const { _id } = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getAllJobs()
            .then(setAllJobs)
            .catch(console.error)
        getUserJobs(_id)
            .then(setMyJobs)
            .catch(console.error)
    }, [_id])

    return (
        <>
            <Header />

            <div className={styles.dashboard}>
                <div className={styles.jobLists}>
                    <div>
                        <h1>All Jobs</h1>
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
                                            <a href={`/jobs/${job._id}`}>View</a>

                                            {job.createdBy === user._id && (
                                                <>
                                                    {' | '}
                                                    <a href={`/jobs/${job._id}/edit`}>Edit</a>
                                                    {' | '}
                                                    <a href={`/jobs/${job._id}/delete`}>Cancel</a>
                                                </>
                                            )}

                                            {job.assignedTo == null && job.createdBy !== user._id && (
                                                <>
                                                    {' | '}
                                                    <a href={`/jobs/${job._id}/assign`}>Add</a>
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
                        <table>
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
                                            <a href={`/jobs/${job._id}`}>View</a>
                                            {' | '}
                                            <a href={`/jobs/${job._id}/complete`}>Done</a>
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

