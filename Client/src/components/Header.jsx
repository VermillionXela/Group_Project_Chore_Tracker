import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from '../css/Header.module.css'

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const storedUser = localStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null
    const isLoggedIn = !!user

    const logout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    const isDashboard = location.pathname === "/dashboard"

    return (
        isLoggedIn && (
            <div className={styles.header}>
                <p className={styles.welcome}>Welcome, {user.firstName}!</p>

                {isDashboard ? (
                    <div className={styles.links}>
                        <button onClick={() => navigate("/addjob")} className={styles.button}>
                            Add A Job
                        </button>
                        <button onClick={() => navigate("/my-posted-jobs")} className={styles.button}>
                            My Posted Jobs
                        </button>

                        <button onClick={logout} className={styles.button}>Logout</button>
                    </div>
                ) : (
                    <div className={styles.links}>
                        <button onClick={() => navigate(-1)} className={styles.button}>
                            Back
                        </button>
                        <button onClick={logout} className={styles.button}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        )
    )
}
