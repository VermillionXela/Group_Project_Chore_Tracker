import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL:`http://localhost:8004/api/users`
})


export const userLogin = async( credentials)=>{
    try{
        const RES = await USER_INSTANCE.post('/login', credentials)
        return RES.data
    }catch(error){throw error }
}

export const createUser= async( data )=>{
    try{
        const RES = await USER_INSTANCE.post('/', data)
        return RES.data
    }catch(error){throw error }
}

export const getAllUsers = async()=>{
    try{
        const RES = await USER_INSTANCE.get('/')
        return RES.data
    }catch(error){throw error }
}

export const getUserById = async( id )=>{
    try{
        const RES = await USER_INSTANCE.get(`/${id}`)
        return RES.data
    }catch(error){throw error }
}
