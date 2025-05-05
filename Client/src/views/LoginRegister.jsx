import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser, userLogin } from '../Services/User_Services'
import styles from '../css/LoginRegister.module.css'

export const LoginRegister = () => {
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [registerErrors, setRegisterErrors] = useState({})
    const [loginErrors, setLoginErrors] = useState('')
    const navigate = useNavigate()

    const updateRegister = (e) => {
        const { name, value } = e.target
        setRegisterData({ ...registerData, [name]: value })
    }

    const updateLogin = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }


    const handleRegister = async (e) => {
        e.preventDefault()
        if (registerData.password !== registerData.confirmPassword) {
            return setRegisterErrors("Passwords must match")
        }
        try {
            const res = await createUser(registerData)
            localStorage.setItem('user', JSON.stringify(res))
            navigate('/dashboard')
        } catch (err) {
            setRegisterErrors(err.response.data.errors)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await userLogin(loginData)
            localStorage.setItem('user', JSON.stringify(res))
            navigate('/dashboard')
        } catch (error) {
            setLoginErrors('Invalid credentials')
        }
    }

    return (
        <>
            <h1 className={styles.pageTitle}>Welcome to Chore Tracker</h1>
            <div className={styles.formContainer}>
                <form className={styles.regBox} onSubmit={handleRegister}>
                    <h2>Register</h2>

                    <div className={styles.formInput}>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={registerData.firstName}
                            onChange={updateRegister}
                        />
                        {registerErrors.firstName && <p className={styles.errorText}>{registerErrors.firstName.message}</p>}
                    </div>

                    <div className={styles.formInput}>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={registerData.lastName}
                            onChange={updateRegister}
                        />
                        {registerErrors.lastName && <p className={styles.errorText}>{registerErrors.lastName.message}</p>}
                    </div>

                    <div className={styles.formInput}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={updateRegister}
                        />
                        {registerErrors.email && <p className={styles.errorText}>{registerErrors.email.message}</p>}
                    </div>

                    <div className={styles.formInput}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={updateRegister}
                        />
                        {registerErrors.password && <p className={styles.errorText}>{registerErrors.password.message}</p>}
                    </div>

                    <div className={styles.formInput}>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={updateRegister}
                        />
                        {registerErrors.confirmPassword && <p className={styles.errorText}>{registerErrors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className={styles.submitBtn}>Register</button>
                </form>

                <form className={styles.loginBox} onSubmit={handleLogin}>
                    <h2>Login</h2>
                    {loginErrors && <p className={styles.errorText}>{loginErrors}</p>}

                    <div className={styles.formInput}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={updateLogin}
                        />
                    </div>

                    <div className={styles.formInput}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={updateLogin}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Log In</button>
                </form>
            </div>
        </>
    )
}
