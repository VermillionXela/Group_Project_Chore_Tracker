import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getJobById, assignJobToUser } from '../Services/Job_Services'
import styles from '../css/ViewJobView.module.css'
import { Header } from '../components/Header'
import { useAuth } from '../Auth/useAuth'

export const ViewJobView = () => {
    const { user } = useAuth()
    const { _id } = user

    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getJobById(id)
            .then(data => setJob(data))
            .catch(() => setError('Error loading job info'))
    }, [id])

    const handleAddToMyJobs = async () => {
        try {
            await assignJobToUser(id, _id)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setError('Error adding to jobs')
        }
    }
    
    if (!job) return <p>Loading...</p>

    return (
        <>
            <Header />

            <div className={styles.viewContainer}>
                <h1>{job.title}</h1>
                <div className={styles.jobDetails}>
                    <p>{job.description}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Posted by:</strong> {job.createdBy.firstName} {job.createdBy.lastName}</p>
                    <p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
                {job.assignedTo === null ? (
                    <button
                        onClick={handleAddToMyJobs}
                        className={styles.button}
                    >
                        Add To My Jobs
                    </button>
                ) : (
                    <p className={styles.jobTakenText}>Job Taken</p>
                )}
            </div>
        </>
    )
}
