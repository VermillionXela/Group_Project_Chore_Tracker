import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './config/config.mongoose.js'
import userRouter from './routes/user_routes.js'
import jobRouter from './routes/job_routes.js'
dotenv.config()
const PORT = process.env.PORT || 8004

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)
app.use('/api/jobs', jobRouter)
dbConnect()
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))