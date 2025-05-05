import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from '../css/Header.module.css' 

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem("user"))
    const isLoggedIn = !!user

    const logout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    const isDashboard = location.pathname === "/dashboard"

    return (
        <div className={styles.header}>
            {isLoggedIn && (
                <>
                    {isDashboard ? (
                        <>
                            <h4 className={styles.welcome}>Welcome {user?.firstName}!</h4>
                            <div className={styles.links}>
                                <button onClick={() => navigate("/addjob")} className={styles.button}>Add A Job</button>
                                <button onClick={logout} className={styles.button}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.links}>
                            <button onClick={() => navigate(-1)} className={styles.button}>Back</button>
                            <button onClick={logout} className={styles.button}>Logout</button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}


 