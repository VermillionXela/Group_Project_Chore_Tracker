import axios from 'axios'

const JOB_INSTANCE = axios.create({
    baseURL:`http://localhost:8000/api/jobs`
})



export const createJob = async( userId )=>{
    try{
        const RES = await JOB_INSTANCE.post(`/${userId}`)
        return RES.data
    }catch(error){throw error }
}

export const getUserJobs = async( userId )=>{
    try{
        const RES = await JOB_INSTANCE.get(`/${userId}`)
        return RES.data
    }catch(error){throw error }
}

export const getAllJobs = async()=>{
    try{
        const RES = await JOB_INSTANCE.get('/')
        return RES.data
    }catch(error){throw error }
}

export const getJobById =async( id )=>{
    try{
        const RES = await JOB_INSTANCE.get(`/job/${ id }`)
        return RES.data
    }catch(error){throw error }
}

export const deleteJobById=async()=>{
    try{
        const RES = await JOB_INSTANCE.delete(`/job/${ id }`)
        return RES.data
    }catch(error){throw error }
}

export const updateJobById= async( id, data )=>{
    try{
        const RES = await JOB_INSTANCE.put(`/job/${ id }`, data )
        return RES.data
    }catch(error){throw error }
}

export const assignJobToUser = async( id, userId)=>{ 
    try{
        const RES = await JOB_INSTANCE.put( `/claim/${ id }`, { userId })
        return RES.data
    }catch(error){throw error }
}