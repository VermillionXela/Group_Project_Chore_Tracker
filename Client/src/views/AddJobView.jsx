import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob } from '../Services/Job_Services'
import { useAuth } from '../Auth/useAuth'
import styles from '../css/AddJobView.module.css'
import { Header } from '../components/Header'

export const AddJobView = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        userId: user._id
    })

    const [errors, setErrors] = useState({})
    

    const updateJob = (e) => {
        const { name, value } = e.target
        setJobData({ ...jobData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createJob(jobData)
            navigate('/dashboard')
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <>
            <Header />

            <h1 className={styles.pageTitle}>Add a Job</h1>
            <form className={styles.jobForm} onSubmit={handleSubmit}>
                <div className={styles.formInput}>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        onChange={updateJob}
                    />
                    {errors.title && <p className={styles.errorText}>{errors.title.message}</p>}
                </div>

                <div className={styles.formInput}>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={updateJob}
                    />
                    {errors.description && <p className={styles.errorText}>{errors.description.message}</p>}
                </div>

                <div className={styles.formInput}>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={updateJob}
                    />
                    {errors.location && <p className={styles.errorText}>{errors.location.message}</p>}
                </div>

                <button className={styles.submitBtn} type="submit">Submit</button>
            </form>
        </>
    )
}
