import {connect} from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()
const MONGO_URI = process.env.MONGODB_URI

export const dbConnect = async () => {
    try{
        await connect(MONGO_URI, {dbName: 'ChoreTracker'})
        console.log(`connected to Mongo`)
    }
    catch(error){console.log(`Connection failed --- ${error}`)}
} 